# React

## 自定义文件上传React组件， 功能方便，提供的事件也丰富

我们来介绍个文件上传功能的前端实现，使用的是 rc-upload ，这是ant design 库使用的上传扩展。

有时我们不想使用 ant design 上传功能，就是不想安装antdesign，但网站需要上传功能，这个时候自己封装个上传组件就是很现现实的问题。

**首先安装组件**

```js
pnpm i rc-upload
```

下面是我定义的React上传组件。

```js
import { useAxios } from '@/hooks/useAxios';
import { UploadOne } from '@icon-park/react';
import Upload from 'rc-upload';
import React from 'react';
import { Button } from '../ui/button';


interface IFile { uid: string, name: string }
interface Props<T> {
	//上传的后台url地址
	action: string;
	//开始上传
	onStart?(file: IFile): void;
	//上传成功回调
	onSuccess(data: T, file: IFile): void
	//上传进度
	onProgress?(percent: number, file: IFile): void
	//发生错误
	onError?(err: any): void,
	//可以选择的文件类型
	accept: string,
}
export const RcUpload = <T = Record<string, string>>({ action, accept, onStart, onSuccess, onProgress, onError, children }: React.PropsWithChildren<Props<T>>): React.ReactElement => {
	//这是我后台封装的axios，你需要修改成你的axios
	const { axiosInstance } = useAxios()
	const uploadProps = {
		action,
		multiple: true,
		data: {},
		accept,
		headers: {
			Authorization: '$prefix $token',
		},
		//开始上传时
		onStart(file: IFile) {
			onStart?.(file)
		},
		//上传成功时
		onSuccess(res: T, file: IFile) {
			onSuccess(res, file)
		},
		//发生错误
		onError(err: any) {
			onError?.(err)
		},
		//上传进度
		onProgress({ percent }: any, file: IFile) {
			onProgress?.(percent, file)
		},
		//自定义上传文件处理
		customRequest({
			action,
			data,
			file,
			filename,
			headers,
			onError,
			onProgress,
			onSuccess,
			withCredentials,
		}: any) {
			const formData = new FormData();
			if (data) {
				Object.keys(data).forEach(key => {
					formData.append(key, data[key] as string);
				});
			}
			formData.append(filename, file);
			//使用自定义的axios上传，这里需要使用你自定义的axios
			axiosInstance
				.post(action, formData, {
					withCredentials,
					headers,
					onUploadProgress: ({ total, loaded }: any) => {
						onProgress({ percent: Number(Math.round((loaded / total) * 100).toFixed(2)) }, file);
					},
				})
				.then(({ data: response }) => {
					onSuccess(response, file);
				})
				.catch(onError);

			return {
				abort() {
					console.log('upload progress is aborted.');
				},
			};
		},
	};
	return (
		<Upload {...uploadProps as any}>
			{children ? children :
				<Button variant="outline">
					<UploadOne theme="outline" size="48" strokeWidth={3} />上传文件
				</Button>
			}
		</Upload>
	);
};
```

接着我们来看怎么使用

```js
<RcUpload
        action="/user/upload/avatar" onStart={() => { }}
        accept='.jpeg,.jpg,.gif'
        onSuccess={(data) => {
            //上传处理 data 为后台返回的上传结果
        }
        }>
        <div className='w-52 space-y-3 cursor-pointer'>
            <img src={user('avatar')} className='w-52' />
            <div className='text-xs text-muted-foreground text-center'>
                点击上传图片
            </div>
        </div>
    </RcUpload>
```
