import { useState, useEffect } from 'react';

import Comment from './component/Comment';

import { getData, postData } from './utils/request';

import './App.css';

function App() {
	const [content, setContent] = useState('');
	const [userName, setUserName] = useState('');
	const [loading, setLoading] = useState(false);
	const [list, setList] = useState([]);


	function getDataList() {
		getData('comment')
			.then(res => {
				const results = res.results || [];
				setList(results)
			})
			.catch(err => {
				alert('获取数据失败')
			})
	}

	useEffect(() => {
		const userName = prompt('请输入您喜欢的昵称');
		window.localStorage.setItem('userName', userName || 'user');
		setUserName(userName);
		getDataList();
	}, [])

	function addComment() {
		if (!content || loading) {
			return;
		}

		const data = {
			by: window.localStorage.getItem('userName'),
			kids: [],
			text: content,
		}

		setLoading(true);

		postData('comment', {
			body: JSON.stringify(data)
		}).then(res => {
			setContent('');

			setList(c => {
				let newList = JSON.parse(JSON.stringify(c));
				newList.push({
					...data,
					children: [],
					objectId: res.objectId,
					createdAt: res.createdAt,
				});
				console.log(newList, res)
				return newList;
			});

			setLoading(false);

		}).catch(err => {
			alert('添加评论失败')
		})
	}

	function handleUpdateData(parent, others) {
		parent.children = parent.children || [];
		parent.children = [...parent.children, ...others];
		setList(c => JSON.parse(JSON.stringify(c)));
	}

	return (
		<div className="App">
			<header className="App-header">
				<div className="user-box">
					<span>{userName}</span>
				</div>
				<textarea
					value={content}
					onChange={e => setContent(e.target.value)}
					cols="50"
				/>
				<div className="App-header-operation">
					<button onClick={addComment}>添加评论</button>
				</div>
			</header>
			<div className="comment-list">
				{
					list.map(item => {
						return (
							<Comment
								data={item}
								key={item.objectId}
								updateData={handleUpdateData}
							/>
						);
					})
				}
			</div>
		</div>
	);
}

export default App;
