import { ref, uploadBytesResumable, getDownloadURL, StorageReference } from "firebase/storage";
import { storage } from "@/services/firebase";
import { useState } from "react";

type Return = {
    handleUploadFile: () => Promise<string[]>;
    handleSelectFile: (files: any) => void;
};

export function useUploadFile(): Return {
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [progressUpload, setProgressUpload] = useState(0);

    const handleUploadFile = async (): Promise<string[]> => {
        const uploadPromises: Promise<string>[] = [];

        if (imageFiles && imageFiles.length > 0) {
            try {
                await Promise.all(imageFiles.map(async (file) => {
                    const name = file.name;
                    const storageRef = ref(storage, `images/${name}`);
                    const uploadTask = uploadBytesResumable(storageRef, file);

                    const promise = new Promise<string>((resolve, reject) => {
                        uploadTask.on(
                            'state_changed',
                            (snapshot) => {
                                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                setProgressUpload(progress);
                            },
                            (error) => {
                                console.log(error.message);
                                reject(error);
                            },
                            async () => {
                                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                                resolve(downloadURL);
                            }
                        );
                    });

                    uploadPromises.push(promise);
                }));

                return Promise.all(uploadPromises);
            } catch (error) {
                console.error('Erro durante o upload:', error);
                throw error;
            }
        } else {
            console.log('No files selected');
            return [];
        }
    };

    const handleSelectFile = (files: any) => {
        if (files && files.length > 0) {
            const newFiles: File[] = Array.from(files);

            setImageFiles((prevFiles: File[]) => {
                const updatedFiles = [...prevFiles, ...newFiles];
                console.log(updatedFiles);
                return updatedFiles;
            });
        } else {
            alert("No files selected");
        }
    };

    return {
        handleUploadFile,
        handleSelectFile
    };
}
