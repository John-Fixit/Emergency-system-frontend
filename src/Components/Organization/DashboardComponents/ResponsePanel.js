import { useSelector } from "react-redux";
import styled from "styled-components";
import Video from "./Video";
function ResponsePanel() {
  const activeMessage = useSelector((state) => state.response.activeMessage);

  const respond=()=>{
        console.log('Hello')
  }
  return (
    <>
      <div className="col-lg-12">
        <Card className="card">
          <h3 className="card-header text-center">Alert Response Panel</h3>
          <div className="card-body">
            <h5 className="card-title">Emergency Content:</h5>
            <div className="card-text">
              <p>
                <b>Message</b>: {activeMessage?.message.text}
              </p>

              <div
                className={`${!!activeMessage?.message.audio ? "" : "d-none"}`}
              >
                <audio src={activeMessage?.message.audio} controls />
              </div>
              <div
                className={`${!!activeMessage?.message.video ? "" : "d-none"}`}
              >
                <video
                  width="270px"
                  height="200px"
                  src={activeMessage?.message.video}
                  controls
                />
              </div>
              {/* <Video url={"link"} /> */}
              <p className="my-2">
                <b>Location</b>: Ikeja Golf Course, Oladipo Bateye Street, Ikeja
                100271, Lagos State, Nigeria {activeMessage?.location}
              </p>
              <p className="my-2">
                <b>Reported Time & Date</b>:{" "}
                {new Date(activeMessage?.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
          <div className="card-footer bg-white border-0">
            <button className="btn btn-primary px-5" >Respond</button>
          </div>
        </Card>
      </div>
    </>
  );
}

export default ResponsePanel;

const Card = styled.div``;
