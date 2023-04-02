export class MilitaryTimeValidator {
  private isValidTime(timeString: string): boolean {
    const [ hours, minutes ] = timeString.split(":").map(Number);
    return (hours >= 0 && hours <= 23) && (minutes >= 0 && minutes <= 59);
  }

  private getMilliseconds(timeString: string): number {
    const [ hours, minutes ] = timeString.split(":").map(Number);
    const date = new Date(); 
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);
    return date.getTime()
  }

  isValidRange(timeRange: string) {
    if (!(/^\d{2}:\d{2}\s-\s\d{2}:\d{2}$/).test(timeRange)) {
      return false;
    }

    // validate start and end times 
    let [startTime, endTime] = timeRange.split(" - "); 
    let [startTimeHours, startTimeMinutes] = startTime.split(":").map(Number);
    let [endTimeHours, endTimeMinutes] = endTime.split(":").map(Number);

    let isValidStartTime = this.isValidTime(startTime); 
    let isValidEndTime = this.isValidTime(endTime); 
    
    // convert start time and end time to milliseconds and compare 
    const startTimeInMilliseconds = this.getMilliseconds(startTime);
    const endTimeInMilliseconds = this.getMilliseconds(endTime);

    return isValidStartTime && isValidEndTime 
        && (startTimeInMilliseconds < endTimeInMilliseconds);
  }
}