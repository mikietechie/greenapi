import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [payloads, setPayloads] = useState<unknown[]>([]);
  const [instanceCode, setInstanceCode] = useState("");
  const [idInstance, setIdInstance] = useState("");
  const [apiTokenInstance, setApiTokenInstance] = useState("");
  const [msgPhoneNumber, setMsgPhoneNumber] = useState("");
  const [textMsg, setTextMsg] = useState("");
  const [filePhoneNumber, setFilePhoneNumber] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  useEffect(() => {
    setInstanceCode((idInstance || "").slice(0, 4));
  }, [idInstance]);

  const addPayload = (payload: unknown) => {
    setPayloads([payload, ...payloads]);
  };

  const getSettings = async () => {
    try {
      const res = await axios.get(
        `https://${instanceCode}.api.green-api.com/waInstance${idInstance}/getSettings/${apiTokenInstance}`
      );
      if (res.status === 200) {
        return addPayload(res.data);
      }
      throw `getSettings ${res.statusText}`;
    } catch (error) {
      alert(`getSettings ${error}`);
    }
  };

  const getStateInstance = async () => {
    try {
      const res = await axios.get(
        `https://${instanceCode}.api.green-api.com/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`
      );
      if (res.status === 200) {
        return addPayload(res.data);
      }
      throw `getSettings ${res.statusText}`;
    } catch (error) {
      alert(`getSettings ${error}`);
    }
  };

  const sendMessage = async () => {
    try {
      const res = await axios.post(
        `https://${instanceCode}.api.green-api.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
        {
          chatId: `${msgPhoneNumber}@c.us`,
          message: textMsg,
        }
      );
      if (res.status === 200) {
        return addPayload(res.data);
      }
      throw `getSettings ${res.statusText}`;
    } catch (error) {
      alert(`getSettings ${error}`);
    }
  };

  const sendFileUrl = async () => {
    try {
      const fileName = (fileUrl || "").split("/").at(-1);
      const res = await axios.post(
        `https://${instanceCode}.api.green-api.com/waInstance${idInstance}/sendFileByUrl/${apiTokenInstance}`,
        {
          chatId: `${msgPhoneNumber}@c.us`,
          urlFile: fileUrl,
          fileName: fileName,
        }
      );
      if (res.status === 200) {
        return addPayload(res.data);
      }
      throw `getSettings ${res.statusText}`;
    } catch (error) {
      alert(`getSettings ${error}`);
    }
  };

  return (
    <main className="container">
      <div className="row py-3">
        <div className="col-lg-6">
          <div className="mb-4">
            <input
              type="text"
              className="form-control w-100"
              placeholder="idInstance"
              value={idInstance || ""}
              onChange={(e) => setIdInstance(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              className="form-control w-100"
              placeholder="apiTokenInstance"
              value={apiTokenInstance || ""}
              onChange={(e) => setApiTokenInstance(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <button
              className="btn btn-primary w-100"
              disabled={!(idInstance && apiTokenInstance)}
              onClick={getSettings}
            >
              getSettings
            </button>
          </div>
          <div className="mb-4">
            <button
              className="btn btn-primary w-100"
              disabled={!(idInstance && apiTokenInstance)}
              onClick={getStateInstance}
            >
              getStateInstance
            </button>
          </div>

          <div className="mb-4">
            <input
              type="text"
              className="form-control w-100"
              placeholder="77771234567"
              value={msgPhoneNumber || ""}
              onChange={(e) => setMsgPhoneNumber(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <textarea
              className="form-control w-100"
              placeholder="Hello World!"
              onChange={(e) => setTextMsg(e.target.value)}
              value={textMsg || ""}
            ></textarea>
          </div>
          <div className="mb-4">
            <button
              className="btn btn-primary w-100"
              disabled={
                !(idInstance && apiTokenInstance && textMsg && msgPhoneNumber)
              }
              onClick={sendMessage}
            >
              Send Message
            </button>
          </div>

          <div className="mb-4">
            <input
              type="text"
              className="form-control w-100"
              placeholder="77771234567"
              onChange={(e) => setFilePhoneNumber(e.target.value)}
              value={filePhoneNumber || ""}
            />
          </div>
          <div className="mb-4">
            <input
              type="url"
              className="form-control w-100"
              placeholder="https://mysite.com/image/horse.png"
              onChange={(e) => setFileUrl(e.target.value)}
              value={fileUrl || ""}
            />
          </div>
          <div className="mb-4">
            <button
              className="btn btn-primary w-100"
              disabled={
                !(idInstance && apiTokenInstance && fileUrl && filePhoneNumber)
              }
              onClick={sendFileUrl}
            >
              Send File By URL
            </button>
          </div>
        </div>
        <div className="col-lg-6">
          <div
            className="h-100"
            style={{ border: "1px solid black", maxHeight: "100%" }}
          >
            {payloads.map((payload, index) => (
              <pre className="w-100" key={index}>
                {JSON.stringify(payload, null, 2)}
              </pre>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
