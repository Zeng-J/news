import { useState } from 'react';

import utils from '../utils/index';

import { getData, postData } from '../utils/request';

import './Comment.css';

function Comment(props) {
  const [show, setShow] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [replyValue, setReplyValue] = useState('');

  const timeAgo = utils.dateDiff(+new Date(props.data.createdAt));

  function handleShow() {
    if (!props.data.children) {
      const url = encodeURI(`sub_comment?where={"parent":"${props.data.objectId}"}`);
      getData(url)
        .then(res => {
          console.log(res)
          const results = res.results || [];

          props.updateData(
            props.data,
            results
          );
        })
        .catch(err => {
          alert('获取数据失败')
        })
    }
    setShow(i => !i);
  }

  function handleSend() {
    if (!replyValue) {
      return;
    }

    const data = {
      by: window.localStorage.getItem('userName'),
      kids: [],
      parent: props.data.objectId,
      text: replyValue,
    }

    postData('sub_comment', {
      body: JSON.stringify(data)
    }).then(res => {
      setShowReply(false);
      setReplyValue('');

      props.updateData(
        props.data,
        [{
          ...data,
          children: [],
          objectId: res.objectId,
          createdAt: res.createdAt,
        }]
      );

    }).catch(err => {
      alert('回复失败')
    })
  }

  return (
    <div className="comment-list-item">
      <div className="comment">
        <div className="comment-left" onClick={handleShow}>
          <div className={show ? 'comment-left_show' : 'comment-left_hidden'}></div>
        </div>
        <div className="comment-main">
          <div className="meta-box" onClick={handleShow}>
            {props.data.by} {timeAgo}
            {!show ? <span className="meta-box_ellipsis">{props.data.text}</span> : null}
          </div>
          <div className={`comment-box ${show ? 'comment-box_show' : ''}`}>
            <div className="comment-content">
              {props.data.text}
            </div>
            <div className="comment-reply">
              {
                showReply
                  ? (
                    <div>
                      <input value={replyValue} onChange={e => setReplyValue(e.target.value)} />
                      <button onClick={handleSend} style={{ marginLeft: 10 }}>发送</button>
                      <button onClick={() => setShowReply(false)} style={{ marginLeft: 10 }}>取消</button>
                    </div>
                  )
                  : <a onClick={() => setShowReply(true)}>回复</a>
              }
            </div>
            <div className="sub-comment">
              {
                props.data.children && props.data.children.map(child => {
                  return (
                    <Comment
                      data={child}
                      key={child.objectId}
                      updateData={props.updateData}
                    />
                  );
                })
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comment;
