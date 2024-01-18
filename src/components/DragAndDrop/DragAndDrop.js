import { Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import useFilePreview from "../../hooks/useFilePreview";
const { Dragger } = Upload;
const DragAndDrop = ({ addFile, removeFile, max }) => {
    const [handlePreview, previewContent] = useFilePreview();
    const beforeUploadHandler = (file) => {
        addFile(file);
        return false;
    };
    return (
        <>
            <Dragger multiple={true} style={{ marginBottom: 10 }}
                onRemove={removeFile} showUploadList={true}
                listType="picture-card"
                beforeUpload={beforeUploadHandler}
                onPreview={handlePreview}
                accept="image/*">
                <p className="ant-upload-drag-icon">
                    <PlusOutlined />
                </p>
                <p className="ant-upload-text">
                    Chọn vùng này hoặc kéo thả files để upload (tối đa {max} ảnh)
                </p>
            </Dragger>
            {previewContent}
        </>
    )
}
export default DragAndDrop;