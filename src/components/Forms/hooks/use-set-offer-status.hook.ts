const useSetOfferStatus = async (id: number, status: number) => {
    try {
        const response = await fetch(`https://localhost:7215/api/Offers/${id}/status`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status }),
        });

        if (!response.ok) {
            throw new Error(`Failed to update offer status. Status: ${response.status}`);
        }
    } catch (error) {
        console.log(error);
    }
};

export default useSetOfferStatus;