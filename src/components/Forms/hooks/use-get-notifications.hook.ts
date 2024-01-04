import { toast } from 'react-toastify';

interface Notification {
  userId: number;
  offerId: number;
}


const usePostNotifications = async ({ userId, offerId }: Notification) => {
  try {
    const response = await fetch(`https://localhost:7215/api/Hirings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, offerId, createdAt: new Date() }),
    });
    if (response.status === 200) {
      toast.success("Service Hired Successfully!");
    } else {
      throw new Error(`Failed to hire this offer. Status: ${response.status}`);
    }
  } catch (error) {
    toast.error("This offer is already hired!");
  }
};

export default usePostNotifications;