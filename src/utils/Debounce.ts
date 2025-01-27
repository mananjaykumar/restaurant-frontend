export const Debounce = (search: (val: any) => void, delay: number) => {
    let timeout: any;
    return (querySearch: any) => {
      // clear previous req.
      if (timeout) clearTimeout(timeout);
  
      // calling function after a particular delay time
      timeout = setTimeout(() => {
        timeout = null;
        search(querySearch);
      }, delay);
    };
  };
  