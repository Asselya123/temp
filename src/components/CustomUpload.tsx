import { App, Button, Upload } from "antd";
import axios from "axios";
import { FC } from "react";

const { Dragger } = Upload;

interface CustomUploadProps {
    setLink: (link: string) => void;
}

export const CustomUpload: FC<CustomUploadProps> = ({ setLink }) => {
    const { message } = App.useApp();
    const customUploadRequest = async (options: any) => {
        const { onSuccess, onError, file, onProgress } = options;

        const formData = new FormData();
        const config = {
            headers: { "content-type": "multipart/form-data" },
            onUploadProgress: (event: any) => {
                onProgress({ percent: (event.loaded / event.total) * 100 });
            },
        };

        try {
            formData.append("file", file);
            const res = await axios.post<{ url: string }>(`https://aws-upload-next.vercel.app/api/upload`, formData, config);

            const resumeLink = res.data.url;

            onSuccess(resumeLink);
            setLink(resumeLink);
            message.success("Документ успешно загружен");
        } catch (updateError) {
            console.log("updateError", updateError);
            message.error("Не удалось загрузить документ");
            onError(updateError);
        }
    };
    return (
        <Dragger maxCount={1} customRequest={customUploadRequest}>
            <div className="flex h-[200px] w-full items-center justify-center gap-2">
                <p className="text-gray-500">Drag and drop your file here, or</p>

                <Button type="primary" htmlType="submit">
                    Click to upload
                </Button>
            </div>
        </Dragger>
    );
};
