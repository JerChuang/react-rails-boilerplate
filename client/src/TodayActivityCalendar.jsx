import React, {Component} from 'react';
import TodaySchedule from './TodaySchedule.jsx';

class TodayActivityCalendar extends Component {
    render() {
      const activities = this.props.activities.map(activity => {
        return <TodaySchedule key = {activity.id} color = {this.props.color} {...activity } />    
      })
  
      return (
        <main className="todayActivityList">
          {activities}
        </main>      
      );
    }
  }

export default TodayActivityCalendar
