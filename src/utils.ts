export function uuid() {
  let d = new Date().getTime();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}

export const scrollUtil = () => {
  setTimeout(() => {
    const scrollDOM = document.querySelector('.sendbird-conversation__messages-padding');
    //console.warn(scrollDOM);
    if (scrollDOM) {
      const {
        scrollTop,
        scrollHeight,
        clientHeight,
      } = scrollDOM;
      const isScrolledToEnd = (scrollTop + 200) > (scrollHeight - clientHeight);
      // console.warn({
      //   scrollTop,
      //   scrollHeight,
      //   clientHeight,
      //   [scrollHeight - clientHeight]: scrollHeight - clientHeight,
      //   isScrolledToEnd,
      // });
      if (isScrolledToEnd) {
        //console.warn('move to end', scrollDOM.scrollHeight + 200)
        scrollDOM.scrollTop = (scrollHeight - clientHeight) + 200
      }
    }
  }); // We may need ~500ms delay here.
}

export function formatCreatedAtToAMPM(createdAt: number) {
  const date: Date = new Date(createdAt);
  let hours = date.getHours();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const minutes = date.getMinutes();
  const minutesStr: string = (minutes < 10 ? '0' : '') + minutes;
  const strTime = hours + ':' + minutesStr + ' ' + ampm;
  return strTime;
}