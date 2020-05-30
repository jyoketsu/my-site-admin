import React, { useState, useEffect } from "react";
import "./Article.css";
import {
  GET_CATEGORIES,
  GET_TAGS,
  ADD_ARTICLE,
  EDIT_ARTICLE,
  GET_ARTICLE_BY_ID,
  CLEAR_ARTICLE,
} from "../../store/types";
import api from "../../util/api";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../store/reducer";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Controlled as CodeMirror } from "react-codemirror2";
import CodeBlock from "./CodeBlock";
import "codemirror/mode/markdown/markdown";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import { Button, Select, Space, Tag, message } from "antd";
import { BookOutlined, TagsOutlined } from "@ant-design/icons";
const { Option } = Select;

export default function Article() {
  const [input, setInput] = useState("");
  const [category, setCategory] = useState<any>(null);
  const [tag, setTag] = useState<any>(null);

  const article = useTypedSelector((state) => state.article.article);
  const categories = useTypedSelector((state) => state.category.categories);
  const tags = useTypedSelector((state) => state.tag.tags);
  const loading = useTypedSelector((state) => state.common.loading);

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    // 获取文章内容
    if (id && id !== "new") {
      const aritlcePayload = api.article.getById(id);
      dispatch({ type: GET_ARTICLE_BY_ID, payload: aritlcePayload });
    }
    // 获取类别
    const catePayload = api.category.getCategories();
    dispatch({ type: GET_CATEGORIES, payload: catePayload });
    // 获取标签
    const tagPayload = api.tag.getTags();
    dispatch({ type: GET_TAGS, payload: tagPayload });

    return () => {
      dispatch({ type: CLEAR_ARTICLE });
    };
  }, [id, dispatch]);

  useEffect(() => {
    setInput(article.content);
    setCategory(article.category);
    setTag(article.tags);
  }, [article._id, article.content, article.category, article.tags]);

  function handleCommit() {
    if (!input) {
      return message.warning("文章内容不能为空！");
    }
    if (!category) {
      return message.warning("请选择类别！");
    }
    const imgReg = /<img.*?(?:>|\/>)/gi; //匹配图片中的img标签
    const srcReg = /src=['"]?([^'"]*)['"]?/i; // 匹配图片中的src

    let innerHtml;
    let cover: any = "";
    let title: string = "";
    let dom = document.getElementById("editor-preview");
    if (dom) {
      const firstNode: any = dom.childNodes[0];
      title = firstNode ? firstNode.innerHTML : "";

      innerHtml = dom.innerHTML;
      //筛选出所有的img
      let arr = innerHtml.match(imgReg);
      if (arr) {
        const srcMatch = arr[0].match(srcReg);
        if (srcMatch) {
          cover = srcMatch[1];
        }
      }
    }

    // 编辑
    if (article._id) {
      const payload = api.article.update(
        article._id,
        title,
        cover,
        input,
        category,
        tag
      );
      dispatch({
        type: EDIT_ARTICLE,
        content: input,
        category,
        tag: tag,
        payload: payload,
      });
    } else {
      // 新增
      const payload = api.article.add(
        title,
        cover,
        input,
        "5ecb7b68e749d86cea7874fb",
        category,
        tag,
        1
      );
      dispatch({ type: ADD_ARTICLE, payload: payload });
    }
    dom = null;
    innerHtml = null;
  }

  return (
    <div className="site-layout-background aritcle-wrapper">
      <div className="editor-body">
        <div className="editor-wrapper">
          <CodeMirror
            value={input}
            options={{
              mode: "markdown",
              theme: "material",
              lineNumbers: true,
              lineWrapping: true,
            }}
            onBeforeChange={(editor, data, value) => {
              setInput(value);
            }}
            onChange={(editor, metadata, value) => {}}
          />
        </div>
        <div className="editor-preview" id="editor-preview">
          <ReactMarkdown
            source={input}
            escapeHtml={false}
            renderers={{ code: CodeBlock }}
          />
        </div>
      </div>
      <div className="editor-head">
        <div className="editor-foot-left">
          <Space size="middle" align="baseline">
            <Space size="small">
              <BookOutlined style={{ fontSize: "18px" }} />
              <Select
                placeholder="请选择类别"
                style={{ width: "120px" }}
                value={category || undefined}
                onChange={(value) => setCategory(value)}
              >
                {categories.map((category, index) => (
                  <Option key={index} value={category._id}>
                    {category.name}
                  </Option>
                ))}
              </Select>
            </Space>
            <Space size="small" align="baseline">
              <TagsOutlined style={{ fontSize: "18px" }} />
              <Select
                mode="multiple"
                placeholder="请选择标签"
                style={{ minWidth: "120px" }}
                value={tag || undefined}
                onChange={(value) => setTag(value)}
              >
                {tags.map((tag, index) => (
                  <Option key={index} value={tag._id}>
                    <Tag color={tag.color}>{tag.name}</Tag>
                  </Option>
                ))}
              </Select>
            </Space>
          </Space>
        </div>
        <div className="editor-foot-right">
          {loading && input ? (
            <span className="aritcle-status">正在保存...</span>
          ) : (
            <span className="aritcle-status">已保存所有修改</span>
          )}
          <Button type="primary" onClick={() => handleCommit()}>
            保存
          </Button>
        </div>
      </div>
    </div>
  );
}
