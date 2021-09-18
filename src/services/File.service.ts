import Service from '../Service'
import { File } from '../@types';
import { v4 as uuid } from 'uuid'

class FileService extends Service {

    private static getSignedUrl(fileInfo: File.UploadRequestInput) {

        return this.Http.post<File.UploadRequest>('/upload-requests', fileInfo)
            .then(this.getData)
            .then(res => res.uploadSignedUrl);
    }


    private static uploadFileToSignedUrl(signedUrl: string, file: File) {

        return this.Http.put<{}>(signedUrl, file, {
            headers: { 'Content-Type': file.type }
        })
            .then(this.getData);
    }

    private static getFileExtension(fileName: string): string {
        const [fileExtension] = fileName.split('.').slice(-1);
        return fileExtension;
    }

    private static generateFileName (fileExtension: string): string{
        return `${uuid()}.${fileExtension}`;
    }

    static async upload(file: File){

        const fileExtension = this.getFileExtension(file.name);
        const fileName = this.generateFileName(fileExtension);

        const signedUrl = await this.getSignedUrl({ fileName, contentLength: file.size});

        await this.uploadFileToSignedUrl(signedUrl, file);

        return signedUrl.split('?')[0];
    }
}

export default FileService