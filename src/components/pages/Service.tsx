import React from "react";
import { PageHeader, Card, Button } from "antd";
import Loading from "../common/Loading";
import { useTypedSelector } from "../../redux/reducer/RootState";
import { useDispatch } from "react-redux";
import { reloadPm2 } from "../../redux/actions/systemActions";

export default function Service() {
  const dispatch = useDispatch();
  const loading = useTypedSelector((state) => state.common.loading);

  const handleReload = (name: string) => dispatch(reloadPm2(name));

  return (
    <div>
      <PageHeader className="site-page-header" title="系统服务" />
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <Card title="后台服务" style={{ width: 300, margin: 8 }}>
          <Button type="primary" onClick={() => handleReload("my-Service")}>
            重载
          </Button>
        </Card>
        <Card title="主页服务" style={{ width: 300, margin: 8 }}>
          <Button type="primary" onClick={() => handleReload("homepage")}>
            重新构建
          </Button>
        </Card>
        <Card title="博客服务" style={{ width: 300, margin: 8 }}>
          <Button type="primary" onClick={() => handleReload("my-blog")}>
            重新构建
          </Button>
        </Card>
      </div>
      {loading ? <Loading /> : null}
    </div>
  );
}
