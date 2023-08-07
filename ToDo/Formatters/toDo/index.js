const toDoFormatter = (item) => {

    const { _id, username, title, description, createdAt, updatedAt } = item;

    const dateFormatter =  (date) => {
      if (date instanceof Date) {
        return date.toDateString();
      }
      return "-";
    }
    
  
    return {
      id: _id.toString(),
      username,
      title,
      description,
      createdAt: dateFormatter(createdAt),
      updatedAt: dateFormatter(updatedAt)
    };
  };
  
  module.exports = toDoFormatter;
  