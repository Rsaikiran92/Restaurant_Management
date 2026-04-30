import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import loading from "../assets/loading.lottie";



function Loading() {
  return (
    <div
      position="fixed"
      width="100vw"
      height="20vh"
      style={{display:"flex",justifyContent:"center"}}
    >
      <DotLottieReact src={loading} loop autoplay style={{ width: 700}} />
    </div>
  );
}

export default Loading;