import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../../../layout/Layout";
import DownloadCommon from "../delivery/DeliveryDownload";
const Download = () => {
  return (
    <>
      <Layout>
        <DownloadCommon />
      </Layout>
    </>
  );
};

export default Download;