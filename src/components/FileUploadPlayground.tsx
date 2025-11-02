import React, { useState, useEffect } from 'react';
import UploadButton from 'react-file-upload-button';

export default function FileUploadPlayground() {
	const [maxSize, setMaxSize] = useState(10);
	const [restrictSize, setRestrictSize] = useState(false);
	const [allowedTypes, setAllowedTypes] = useState('');
	const [uploadedFile, setUploadedFile] = useState<File | null>(null);
	const [errorMessage, setErrorMessage] = useState('');
	const [showPreview, setShowPreview] = useState(false);
	const [showFileIcon, setShowFileIcon] = useState(true);
	const [progressInterval, setProgressInterval] = useState(100);

	// Add custom styles for light mode file preview
	useEffect(() => {
		const styleId = 'upload-button-custom-styles';
		let styleEl = document.getElementById(styleId) as HTMLStyleElement;
		
		if (!styleEl) {
			styleEl = document.createElement('style');
			styleEl.id = styleId;
			document.head.appendChild(styleEl);
		}

		styleEl.textContent = `
			/* Light mode - ensure text is visible on dark background */
			.dark .upload-button-container * {
				color: inherit !important;
			}
			
			/* Light mode specific overrides */
			:not(.dark) .upload-button-container {
				background-color: rgb(30, 41, 59) !important;
			}
			
			:not(.dark) .upload-button-container * {
				color: white !important;
			}
			
			:not(.dark) .upload-button-container svg {
				stroke: white !important;
				fill: white !important;
			}
		`;

		return () => {
			styleEl?.remove();
		};
	}, []);

	const handleFileUpload = (file: File) => {
		setUploadedFile(file);
		setErrorMessage('');
		console.log('File uploaded:', file);
	};

	const handleError = (error: string) => {
		setErrorMessage(error);
		console.error('Upload error:', error);
	};

	const allowedTypesArray = allowedTypes
		? allowedTypes.split(',').map((type) => type.trim())
		: undefined;

	return (
		<div className="space-y-8">
			{/* Configuration Panel */}
			<div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 shadow-xl dark:border-slate-700 dark:from-slate-800 dark:to-slate-900">
				<h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
					Configuration
				</h2>

				<div className="grid gap-6 md:grid-cols-2">
					{/* Max Size */}
					<div>
						<label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
							Max File Size (MB)
						</label>
						<input
							type="number"
							value={maxSize}
							onChange={(e) => setMaxSize(Number(e.target.value))}
							min="1"
							max="100"
							className="w-full rounded-xl border-2 border-slate-300 bg-white px-4 py-2 text-slate-900 transition-all focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-500/20 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
						/>
					</div>

					{/* Progress Interval */}
					<div>
						<label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
							Progress Interval (ms)
						</label>
						<input
							type="number"
							value={progressInterval}
							onChange={(e) => setProgressInterval(Number(e.target.value))}
							min="50"
							max="500"
							step="50"
							className="w-full rounded-xl border-2 border-slate-300 bg-white px-4 py-2 text-slate-900 transition-all focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-500/20 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
						/>
					</div>

					{/* Allowed File Types */}
					<div className="md:col-span-2">
						<label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
							Allowed File Types (comma-separated, e.g., .pdf,.jpg,.png)
						</label>
						<input
							type="text"
							value={allowedTypes}
							onChange={(e) => setAllowedTypes(e.target.value)}
							placeholder="Leave empty to allow all types"
							className="w-full rounded-xl border-2 border-slate-300 bg-white px-4 py-2 text-slate-900 transition-all placeholder:text-slate-400 focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-500/20 dark:border-slate-600 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500"
						/>
					</div>

					{/* Checkboxes */}
					<div className="space-y-3">
						<label className="flex items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
							<input
								type="checkbox"
								checked={restrictSize}
								onChange={(e) => setRestrictSize(e.target.checked)}
								className="mr-2 h-4 w-4"
							/>
							Restrict File Size
						</label>
						<label className="flex items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
							<input
								type="checkbox"
								checked={showPreview}
								onChange={(e) => setShowPreview(e.target.checked)}
								className="mr-2 h-4 w-4"
							/>
							Show File Preview
						</label>
					</div>

					<div className="space-y-3">
						<label className="flex items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
							<input
								type="checkbox"
								checked={showFileIcon}
								onChange={(e) => setShowFileIcon(e.target.checked)}
								className="mr-2 h-4 w-4"
							/>
							Show File Icon
						</label>
					</div>
				</div>
			</div>

			{/* Upload Area */}
			<div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 shadow-xl dark:border-slate-700 dark:from-slate-800 dark:to-slate-900">
				<h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
					File Upload
				</h2>

				<div className="mx-auto max-w-2xl">
					<div className="upload-button-container rounded-2xl bg-slate-800 p-8 dark:bg-slate-100">
						<UploadButton
							maxSizeMB={maxSize}
							restrictFileSize={restrictSize}
							allowedFileTypes={allowedTypesArray}
							onFileUpload={handleFileUpload}
							onError={handleError}
							progressBarInterval={progressInterval}
							showPreview={showPreview}
							showFileIcon={showFileIcon}
							uploadText={
								<span className="text-lg font-semibold text-white dark:text-slate-800">
									Drag & Drop or Click to Upload
								</span>
							}
							subText={
								<span className="text-sm text-slate-300 dark:text-slate-600">
									{restrictSize
										? `Max size: ${maxSize}MB`
										: `Recommended max: ${maxSize}MB`}
									{allowedTypesArray &&
										` • Allowed: ${allowedTypesArray.join(', ')}`}
								</span>
							}
							uploadStyles={{
								color: 'inherit',
								borderColor: 'rgba(148, 163, 184, 0.3)',
							}}
							progressStyles={{
								backgroundColor: 'rgba(249, 115, 22, 0.2)',
								color: 'inherit',
							}}
							fileIcons={{
								delete: (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={2}
										stroke="currentColor"
										className="h-5 w-5 text-white dark:text-slate-800"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
										/>
									</svg>
								),
							}}
						/>
					</div>
				</div>

				{/* Error Message */}
				{errorMessage && (
					<div className="mt-4 rounded-xl bg-red-50 p-4 text-red-700 dark:bg-red-900/20 dark:text-red-400">
						<p className="font-semibold">⚠️ Error</p>
						<p className="text-sm">{errorMessage}</p>
					</div>
				)}

				{/* Success Message */}
				{uploadedFile && !errorMessage && (
					<div className="mt-4 space-y-2 rounded-xl bg-green-50 p-4 dark:bg-green-900/20">
						<p className="font-semibold text-green-700 dark:text-green-400">
							✅ File Uploaded Successfully!
						</p>
						<div className="text-sm text-green-600 dark:text-green-300">
							<p>
								<strong>Name:</strong> {uploadedFile.name}
							</p>
							<p>
								<strong>Size:</strong>{' '}
								{(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
							</p>
							<p>
								<strong>Type:</strong> {uploadedFile.type || 'Unknown'}
							</p>
							<p>
								<strong>Last Modified:</strong>{' '}
								{new Date(uploadedFile.lastModified).toLocaleString()}
							</p>
						</div>
					</div>
				)}
			</div>

			{/* Features Overview */}
			<div className="grid gap-6 md:grid-cols-3">
				<div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-700 dark:bg-slate-800">
					<div className="mb-3 text-3xl">📤</div>
					<h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">
						Drag & Drop
					</h3>
					<p className="text-sm text-slate-600 dark:text-slate-400">
						Intuitive drag-and-drop interface or click to browse files
					</p>
				</div>

				<div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-700 dark:bg-slate-800">
					<div className="mb-3 text-3xl">🔒</div>
					<h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">
						File Restrictions
					</h3>
					<p className="text-sm text-slate-600 dark:text-slate-400">
						Control file types and sizes with custom validation messages
					</p>
				</div>

				<div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-700 dark:bg-slate-800">
					<div className="mb-3 text-3xl">📊</div>
					<h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">
						Progress Bar
					</h3>
					<p className="text-sm text-slate-600 dark:text-slate-400">
						Visual feedback with customizable upload progress
					</p>
				</div>
			</div>
		</div>
	);
}
