export const formattedDate = (date) => {
    try {
        if (!date) {
          return "Add Date Of Birth";
        }
    
        const formattedDate = new Date(date).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });
    
        // Check if the formattedDate is valid (not "Invalid Date")
        if (formattedDate === "Invalid Date") {
          throw new Error("Invalid Date");
        }
    
        return formattedDate;
      } catch (error) {
        return "Invalid Date"; // Handle invalid date gracefully
      }
  }