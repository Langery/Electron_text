export const sortLibrary = (items, sortBy) => {
  const arr = [...items];
  switch (sortBy) {
    case 'name':
      return arr.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    case 'age':
      return arr.sort((a, b) => (b.age ?? -Infinity) - (a.age ?? -Infinity));
    case 'time':
    default:
      return arr.sort((a, b) => {
        if (a.createTime && b.createTime) {
          return new Date(b.createTime) - new Date(a.createTime);
        }
        return String(b.id).localeCompare(String(a.id));
      });
  }
};
