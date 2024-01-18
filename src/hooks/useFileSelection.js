import axios from "axios";
import { useState } from "react";
const useFileSelection = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const processFileImage = async (file) => {

        var POST_URL = "https://api.cloudinary.com/v1_1/dvmxvwqev/upload";
        processFile();
        var uniqueId;

        function processFile(e) {
            console.log("changed");
            uniqueId = "dvmxvwqev" + new Date().getTime();
            var size = file.size;
            var sliceSize = 10 * 1000000;
            var start = 0;

            setTimeout(loop, 500);

            function loop() {
                console.log("looping");
                var end = start + sliceSize;

                if (end > size) {
                    end = size;
                }
                var s = file.slice(start, end);
                send(s, start, end - 1, size);
                if (end < size) {
                    start += sliceSize;
                    setTimeout(loop, 500);
                }
            }
        }

        async function send(piece, start, end, size) {
            // console.log("end", end);

            var formdata = new FormData();

            formdata.append("file", piece);
            formdata.append("cloud_name", "dvmxvwqev");
            formdata.append("upload_preset", "uitbikes_image");

            const headers = {
                Accept: "/",
                "Content-Type": "multipart/form-data",
            };
            headers["X-Unique-Upload-Id"] = uniqueId;
            headers["X-Requested-With"] = "XMLHttpRequest";
            headers["Content-Range"] = "bytes " + start + "-" + end + "/" + size;
            const requestConfig = {
                url: POST_URL,
                method: "POST",
                data: formdata,
                headers,
            };
            const response = await axios(requestConfig);
            if (response?.data?.asset_id) {
                //Here i am trying to print the output of the response after the video is posted in cloudinary
                console.log(response.data.url, "response");
                setImageUrls((currentUrl) => [...currentUrl, response.data.url]);
                if (selectedFiles.indexOf(file) === selectedFiles.length - 1) {
                    setIsUploading(false);
                }
            }
        }
    };
    const addFile = (file) => {
        setSelectedFiles((currentSelection) => [...currentSelection, file]);
    };
    const removeFile = (file) => {
        setSelectedFiles((currentSelection) => {
            const newSelection = currentSelection.slice();
            const fileIndex = currentSelection.indexOf(file);
            newSelection.splice(fileIndex, 1);
            return newSelection;
        });
    };
    const handleUploadImage = () => {
        setImageUrls([]);
        if (selectedFiles.length === 0) {
            return;
        }
        setIsUploading(true);
        selectedFiles.forEach(async (file) => {
            await processFileImage(file);
        })
    }
    return [addFile, removeFile, imageUrls, handleUploadImage, isUploading];
}
export default useFileSelection;