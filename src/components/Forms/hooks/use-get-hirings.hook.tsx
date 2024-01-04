const useGetNotifications = async (userId: number) => {
    try {
        const response = await fetch(`https://localhost:7215/api/Hirings/HiringsByUserOffers/${userId}`);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
};

export default useGetNotifications;