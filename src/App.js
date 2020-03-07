import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import Header from './components/Header';
import JSONPretty from 'react-json-pretty';
import styles from './App.module.css'
import postmanData from './data.json';

function App() {
  useEffect(() => {
  }, [])
  const [items] = useState(postmanData.item)

  return (
    <div className={styles.app}>
      {items.map(item => {
        return extractItem(item)
      })}
    </div>
  );
}

const extractItem = (item, depth = 0, breads = []) => {
  depth = depth + 1;
  const breadsNew = [...breads, item.name];
  if (item.item) {
    return (
      <div style={{pageBreakAfter:'avoid', pageBreakInside: 'avoid'}}>
        <div className={styles.item__group} style={{ fontSize: 18 + (5 - depth) * 4 }}>{item.name}</div>
        {item.item.map(data => extractItem(data, depth, breadsNew))}
      </div>
    )
  }
  else {
    return (
      <div className={styles.item} style={{ pageBreakInside: "avoid" }}>
        <div style={{ flex: 3 }}>
          <Header name={item.name} method={item.request.method} url={item.request.url} breads={breadsNew} />
          {renderHeader(item.request.header)}
          {renderQuery(item.request.url.query)}
          {renderPath(item.request.url.variable)}
          {renderBody(item.request.body)}
        </div>
        <div style={{ flex: 2, marginLeft: 24 }}>
          {renderResponse(item.request.description)}
        </div>
      </div>
    )
  }
}


const renderHeader = (header) => {
  const transformedHeader = header.filter(data => data.key !== 'Content-Type');
  if (transformedHeader.length > 0) {
    return (
      <div className={styles.header}>
        <b>Headers</b>
        <table>
          <tbody>
            {transformedHeader.map(data => {
              return (
                <tr>
                  <td>{data.key}</td>
                  <td>{data.value}</td>
                </tr>
              )
            }
            )}
          </tbody>
        </table>
      </div>
    )
  }
}

const renderBody = (body) => {
  if (body?.mode === 'raw') {
    if (body.raw === "") {
      return null
    }
    return (
      <div className={styles.bodyraw}>
        <b>Body</b>
        <div className={styles.bodyraw__content}>
          <JSONPretty id="json-pretty" data={body.raw}></JSONPretty>
        </div>
      </div>
    )
  }
  else if (body?.mode === 'formdata') {
    return (
      <div style={{ marginTop: 12 }}>
        <b>Body</b>
        <div style={{ marginTop: 6 }}>{'파일업로드'} {body.formdata[0].key}</div>
      </div>
    )
  }
}

const renderQuery = (query) => {
  if (query) {
    return (
      <div className={styles.query}>
        <b>Query Params</b>
        <table>
          <tbody>
            {query.map(q => {
              return (
                <tr>
                  <td>{q.key}</td>
                  <td className={styles.middleTd}>{q.value}</td>
                  <td>{q.description}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

const renderResponse = (description) => {
  if (!description) {
    return null
  }

  return (
    <div className={styles.response}>
      <b>Response</b>
      <ReactMarkdown className={styles.markdown} source={description} />
    </div>
  )
}

const renderPath = (path) => {
  if (path) {
    return (
      <div className={styles.query}>
        <b>Path Variables</b>
        <table>
          <tbody>
            {path.map(q => {
              return (
                <tr>
                  <td>{q.key}</td>
                  <td>{q.value}</td>
                  <td>{q.description}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}
export default App;
