import { Injectable } from '@nestjs/common';
import { Duration, DateTime } from 'luxon';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  isNickWorking(): boolean {
    /** This function checks if Nick is currently working
    :return: True if Nick is working, False if not isn't working
     */
    let montrealtime = DateTime.now();
    console.log(
      'We are currently ' + montrealtime.toLocaleString(DateTime.DATETIME_MED),
    );
    if (
      montrealtime.weekday <= 4 &&
      ((6 <= montrealtime.hour && montrealtime.hour < 14) ||
        (montrealtime.hour == 14 && montrealtime.minute <= 30))
    ) {
      return true;
    } else {
      return false;
    }
  }

  isNickWorkingToday(): boolean {
    /**This function checks if Nick is working today
    :return: True if Nick is working today, False if not isn't working today
    */
    let montrealtime = DateTime.now();
    if (
      montrealtime.weekday <= 4 &&
      (montrealtime.hour < 14 ||
        (montrealtime.hour == 14 && montrealtime.minute <= 30))
    ) {
      return true;
    } else {
      return false;
    }
  }

  untilNick(): number {
    /** This function calculates how many minutes are left before Nick is back at work
    :return: return the amount of minutes before Nick is back to work
    */
    let montrealtime: DateTime = DateTime.now();
    let delta: Duration;
    let nextweekday: Duration;

    if (this.isNickWorkingToday()) {
      delta = Duration.fromObject({
        days: -1,
        hours: 29 - montrealtime.hour,
        minutes: 60 - montrealtime.minute,
      });
    } else {
      nextweekday =
        montrealtime +
        Duration.fromObject({
          days: [0, 0, 0, 0, 2, 1, 0][montrealtime.weekday()],
          hours: 29 - montrealtime.hour,
          minutes: 60 - montrealtime.minute,
        });
      delta = nextweekday - montrealtime;
    }
    //return parseInt(Math.floor(delta.total_seconds() / 60))
    return Math.floor(delta.as('seconds') / 60);
  }
}
