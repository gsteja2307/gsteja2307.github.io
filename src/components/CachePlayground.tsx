import React, { useState, useEffect } from 'react';
import { RuntimeMemoryCache } from 'runtime-memory-cache';

export default function CachePlayground() {
	const [cache] = useState(() => 
		new RuntimeMemoryCache({
			ttl: 10000,
			maxSize: 10,
			enableStats: true,
			evictionPolicy: 'LRU',
		})
	);

	const [key, setKey] = useState('');
	const [value, setValue] = useState('');
	const [ttl, setTtl] = useState('');
	const [getKey, setGetKey] = useState('');
	const [result, setResult] = useState<any>(null);
	const [cacheKeys, setCacheKeys] = useState<string[]>([]);
	const [stats, setStats] = useState<any>(null);
	const [memoryUsage, setMemoryUsage] = useState<any>(null);
	const [message, setMessage] = useState('');
	const [evictionPolicy, setEvictionPolicy] = useState<'FIFO' | 'LRU'>('LRU');
	const [maxSize, setMaxSize] = useState(10);
	const [defaultTtl, setDefaultTtl] = useState(10000);

	// Recreate cache when settings change
	useEffect(() => {
		const newCache = new RuntimeMemoryCache({
			ttl: defaultTtl,
			maxSize: maxSize,
			enableStats: true,
			evictionPolicy: evictionPolicy,
		});
		Object.assign(cache, newCache);
		updateCacheInfo();
	}, [evictionPolicy, maxSize, defaultTtl]);

	const updateCacheInfo = () => {
		setCacheKeys(cache.keys());
		setStats(cache.getStats());
		setMemoryUsage(cache.getMemoryUsage());
	};

	const handleSet = () => {
		if (!key.trim()) {
			setMessage('❌ Please enter a key');
			return;
		}
		const ttlValue = ttl ? parseInt(ttl) : undefined;
		cache.set(key, value || key, ttlValue);
		setMessage(`✅ Set "${key}" = "${value || key}"`);
		setKey('');
		setValue('');
		setTtl('');
		updateCacheInfo();
	};

	const handleGet = () => {
		if (!getKey.trim()) {
			setMessage('❌ Please enter a key to get');
			return;
		}
		const val = cache.get(getKey);
		if (val !== undefined) {
			setResult(val);
			setMessage(`✅ Found value for "${getKey}"`);
		} else {
			setResult(null);
			setMessage(`❌ Key "${getKey}" not found or expired`);
		}
		updateCacheInfo();
	};

	const handleHas = (skipTouch: boolean = false) => {
		if (!getKey.trim()) {
			setMessage('❌ Please enter a key to check');
			return;
		}
		const exists = cache.has(getKey, skipTouch);
		setMessage(
			exists
				? `✅ Key "${getKey}" exists${skipTouch ? ' (skip touch)' : ''}`
				: `❌ Key "${getKey}" does not exist`
		);
		updateCacheInfo();
	};

	const handleDel = () => {
		if (!getKey.trim()) {
			setMessage('❌ Please enter a key to delete');
			return;
		}
		const deleted = cache.del(getKey);
		setMessage(
			deleted
				? `✅ Deleted "${getKey}"`
				: `❌ Key "${getKey}" not found`
		);
		setGetKey('');
		updateCacheInfo();
	};

	const handleClear = () => {
		cache.clear();
		setMessage('✅ Cache cleared');
		setResult(null);
		updateCacheInfo();
	};

	const handleCleanup = () => {
		const removed = cache.cleanup();
		setMessage(`✅ Cleaned up ${removed} expired entries`);
		updateCacheInfo();
	};

	const handleResetStats = () => {
		cache.resetStats();
		setMessage('✅ Statistics reset');
		updateCacheInfo();
	};

	const fillCache = () => {
		for (let i = 1; i <= 5; i++) {
			cache.set(`item${i}`, `Value ${i}`);
		}
		setMessage('✅ Added 5 items to cache');
		updateCacheInfo();
	};

	useEffect(() => {
		updateCacheInfo();
		const interval = setInterval(updateCacheInfo, 1000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="space-y-8">
			{/* Configuration */}
			<div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 shadow-xl dark:border-slate-700 dark:from-slate-800 dark:to-slate-900">
				<h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
					Cache Configuration
				</h2>

				<div className="grid gap-6 md:grid-cols-3">
					<div>
						<label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
							Default TTL (ms)
						</label>
						<input
							type="number"
							value={defaultTtl}
							onChange={(e) => setDefaultTtl(Number(e.target.value))}
							className="w-full rounded-xl border-2 border-slate-300 bg-white px-4 py-2 text-slate-900 transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
						/>
					</div>

					<div>
						<label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
							Max Size
						</label>
						<input
							type="number"
							value={maxSize}
							onChange={(e) => setMaxSize(Number(e.target.value))}
							min="1"
							max="100"
							className="w-full rounded-xl border-2 border-slate-300 bg-white px-4 py-2 text-slate-900 transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
						/>
					</div>

					<div>
						<label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
							Eviction Policy
						</label>
						<select
							value={evictionPolicy}
							onChange={(e) =>
								setEvictionPolicy(e.target.value as 'FIFO' | 'LRU')
							}
							className="w-full rounded-xl border-2 border-slate-300 bg-white px-4 py-2 text-slate-900 transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
						>
							<option value="FIFO">FIFO</option>
							<option value="LRU">LRU</option>
						</select>
					</div>
				</div>
			</div>

			{/* Set Operation */}
			<div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 shadow-xl dark:border-slate-700 dark:from-slate-800 dark:to-slate-900">
				<h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
					Set Value
				</h2>

				<div className="grid gap-4 md:grid-cols-4">
					<div className="md:col-span-1">
						<label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
							Key
						</label>
						<input
							type="text"
							value={key}
							onChange={(e) => setKey(e.target.value)}
							placeholder="e.g., user:123"
							className="w-full rounded-xl border-2 border-slate-300 bg-white px-4 py-2 text-slate-900 transition-all placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500"
						/>
					</div>

					<div className="md:col-span-2">
						<label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
							Value
						</label>
						<input
							type="text"
							value={value}
							onChange={(e) => setValue(e.target.value)}
							placeholder="e.g., John Doe"
							className="w-full rounded-xl border-2 border-slate-300 bg-white px-4 py-2 text-slate-900 transition-all placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500"
						/>
					</div>

					<div>
						<label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
							TTL (ms, optional)
						</label>
						<input
							type="number"
							value={ttl}
							onChange={(e) => setTtl(e.target.value)}
							placeholder="Default"
							className="w-full rounded-xl border-2 border-slate-300 bg-white px-4 py-2 text-slate-900 transition-all placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500"
						/>
					</div>
				</div>

				<button
					onClick={handleSet}
					className="mt-4 rounded-xl bg-blue-500 px-6 py-3 font-semibold text-white transition-all hover:bg-blue-600 hover:shadow-lg"
				>
					Set Value
				</button>
			</div>

			{/* Get/Has/Del Operations */}
			<div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 shadow-xl dark:border-slate-700 dark:from-slate-800 dark:to-slate-900">
				<h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
					Get / Check / Delete
				</h2>

				<div className="mb-4">
					<label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
						Key
					</label>
					<input
						type="text"
						value={getKey}
						onChange={(e) => setGetKey(e.target.value)}
						placeholder="e.g., user:123"
						className="w-full rounded-xl border-2 border-slate-300 bg-white px-4 py-2 text-slate-900 transition-all placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500"
					/>
				</div>

				<div className="flex flex-wrap gap-3">
					<button
						onClick={handleGet}
						className="rounded-xl bg-green-500 px-6 py-3 font-semibold text-white transition-all hover:bg-green-600 hover:shadow-lg"
					>
						Get Value
					</button>
					<button
						onClick={() => handleHas(false)}
						className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-white transition-all hover:bg-cyan-600 hover:shadow-lg"
					>
						Has (Touch)
					</button>
					<button
						onClick={() => handleHas(true)}
						className="rounded-xl bg-indigo-500 px-6 py-3 font-semibold text-white transition-all hover:bg-indigo-600 hover:shadow-lg"
					>
						Has (Skip Touch)
					</button>
					<button
						onClick={handleDel}
						className="rounded-xl bg-red-500 px-6 py-3 font-semibold text-white transition-all hover:bg-red-600 hover:shadow-lg"
					>
						Delete
					</button>
				</div>

				{result !== null && (
					<div className="mt-4 rounded-xl bg-green-50 p-4 dark:bg-green-900/20">
						<p className="font-semibold text-green-700 dark:text-green-400">
							Retrieved Value:
						</p>
						<pre className="mt-2 overflow-x-auto text-sm text-green-600 dark:text-green-300">
							{JSON.stringify(result, null, 2)}
						</pre>
					</div>
				)}
			</div>

			{/* Cache Operations */}
			<div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 shadow-xl dark:border-slate-700 dark:from-slate-800 dark:to-slate-900">
				<h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
					Cache Operations
				</h2>

				<div className="flex flex-wrap gap-3">
					<button
						onClick={fillCache}
						className="rounded-xl bg-purple-500 px-6 py-3 font-semibold text-white transition-all hover:bg-purple-600 hover:shadow-lg"
					>
						Fill Cache (5 items)
					</button>
					<button
						onClick={handleCleanup}
						className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition-all hover:bg-orange-600 hover:shadow-lg"
					>
						Cleanup Expired
					</button>
					<button
						onClick={handleClear}
						className="rounded-xl bg-red-500 px-6 py-3 font-semibold text-white transition-all hover:bg-red-600 hover:shadow-lg"
					>
						Clear All
					</button>
					<button
						onClick={handleResetStats}
						className="rounded-xl bg-slate-500 px-6 py-3 font-semibold text-white transition-all hover:bg-slate-600 hover:shadow-lg"
					>
						Reset Stats
					</button>
				</div>
			</div>

			{/* Message */}
			{message && (
				<div className="rounded-xl bg-blue-50 p-4 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
					<p className="font-semibold">{message}</p>
				</div>
			)}

			{/* Cache State */}
			<div className="grid gap-6 md:grid-cols-2">
				{/* Keys */}
				<div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 shadow-xl dark:border-slate-700 dark:from-slate-800 dark:to-slate-900">
					<h2 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">
						Cache Keys ({cacheKeys.length})
					</h2>
					<div className="max-h-64 overflow-y-auto">
						{cacheKeys.length === 0 ? (
							<p className="text-slate-500 dark:text-slate-400">
								No keys in cache
							</p>
						) : (
							<ul className="space-y-2">
								{cacheKeys.map((k) => (
									<li
										key={k}
										className="rounded-lg bg-white px-3 py-2 text-sm font-mono text-slate-700 dark:bg-slate-800 dark:text-slate-300"
									>
										{k}
									</li>
								))}
							</ul>
						)}
					</div>
				</div>

				{/* Statistics */}
				<div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 shadow-xl dark:border-slate-700 dark:from-slate-800 dark:to-slate-900">
					<h2 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">
						Statistics
					</h2>
					{stats && (
						<div className="space-y-3">
							<div className="flex items-center justify-between rounded-lg bg-white px-3 py-2 dark:bg-slate-800">
								<span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
									Hits
								</span>
								<span className="font-mono text-lg text-green-600 dark:text-green-400">
									{stats.hits}
								</span>
							</div>
							<div className="flex items-center justify-between rounded-lg bg-white px-3 py-2 dark:bg-slate-800">
								<span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
									Misses
								</span>
								<span className="font-mono text-lg text-red-600 dark:text-red-400">
									{stats.misses}
								</span>
							</div>
							<div className="flex items-center justify-between rounded-lg bg-white px-3 py-2 dark:bg-slate-800">
								<span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
									Hit Rate
								</span>
								<span className="font-mono text-lg text-blue-600 dark:text-blue-400">
									{stats.hits + stats.misses > 0
										? (
												(stats.hits /
													(stats.hits + stats.misses)) *
												100
										  ).toFixed(2)
										: 0}
									%
								</span>
							</div>
							<div className="flex items-center justify-between rounded-lg bg-white px-3 py-2 dark:bg-slate-800">
								<span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
									Size / Max
								</span>
								<span className="font-mono text-lg text-slate-700 dark:text-slate-300">
									{stats.size} / {stats.maxSize}
								</span>
							</div>
							<div className="flex items-center justify-between rounded-lg bg-white px-3 py-2 dark:bg-slate-800">
								<span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
									Evictions
								</span>
								<span className="font-mono text-lg text-orange-600 dark:text-orange-400">
									{stats.evictions}
								</span>
							</div>
						</div>
					)}
				</div>
			</div>

			{/* Memory Usage */}
			{memoryUsage && (
				<div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 shadow-xl dark:border-slate-700 dark:from-slate-800 dark:to-slate-900">
					<h2 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">
						Memory Usage
					</h2>
					<div className="grid gap-4 md:grid-cols-2">
						<div className="rounded-lg bg-white p-4 dark:bg-slate-800">
							<p className="mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
								Total Estimated Bytes
							</p>
							<p className="font-mono text-2xl font-bold text-blue-600 dark:text-blue-400">
								{memoryUsage.estimatedBytes.toLocaleString()}
							</p>
						</div>
						<div className="rounded-lg bg-white p-4 dark:bg-slate-800">
							<p className="mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
								Average Bytes Per Entry
							</p>
							<p className="font-mono text-2xl font-bold text-cyan-600 dark:text-cyan-400">
								{memoryUsage.averageBytesPerEntry.toFixed(2)}
							</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
