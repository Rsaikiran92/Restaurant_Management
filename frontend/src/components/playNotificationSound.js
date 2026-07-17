import notificationSound from "../assets/notification.wav";

const playNotificationSound = () => {
  const audio = new Audio(notificationSound);
  audio.currentTime = 0;
  audio.play().catch((err) => {
    console.log(err.message);
  });
};

export default playNotificationSound