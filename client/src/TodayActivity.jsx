import React, { Component } from 'react';
import TodayActivityBox from './TodayActivityBox.jsx';
import TodayActivityCalendar from './TodayActivityCalendar.jsx';
import { Redirect } from "react-router-dom";
import { Icon } from 'antd';
import { Calendar } from 'antd';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

class TodayActivity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            activities: [],
            activity: {},
            categories: [],
            email: this.props.cookies.get('email'),
            completeness: '',
            agenda: [],
        };
    }

    componentDidMount() {
		this.fetchActivity(this.props.params.activityID);
		this.checkCompleteness();
    }

    componentDidUpdate (prevProps) {
        const activityID = this.props.params.activityID
        if (prevProps.params.activityID !== activityID) {
			this.fetchActivity(activityID);
			this.checkCompleteness();
        }
        if (this.state.redirect){
            this.setState({redirect:false})
        }
    }

    fetchActivity = (activityID) => {
        axios.get('/api/user_activities/:id', {
            params: {
                email: this.state.email,
                date: this.props.params
            }
        }) // You can simply make your requests to "/api/whatever you want"
            .then((response) => {
				console.log('this is responsefjdkjkdjd',response)
                // handle success
                const activity = response.data.activities.find(element => {
                    // console.log('elementid',element.id)
                    // console.log('activityid', element.activity_id)
                    return element.id == this.props.params.activityID;
                })
                console.log('activity', this.props.params)
                this.setState({
                    activities: response.data.activities,
                    categories: response.data.categories,
                    activity: activity,
                    agenda: response.data.agenda,
                });
            })
    }
    // toggle calender
    handleClick = () => {
        this.setState({
            active: !this.state.active
        });
	}
    onSelect = (value) => {
        this.setState({
            date: value.format('YYYY-MM-DD'),
            redirect: true,
        });
    }
	checkCompleteness = () => {
		if (this.state.activity.completeness) {
			this.setState({
				completeness: "Completed"
			})
		}
		else {
			this.setState({
				completeness: "Incomplete"
			})
		}
    }
    complete = () => {
        axios.patch(`/api/user_activities/${this.props.params.activityID}`, {
            
            email: this.state.email,
            completeness: true
            
        }) 
            .then((response) => {
                this.setState({
                    completeness: "Completed"
                });
            })

    }
    
    onFullRender = (value) => {
        const date = value.format('YYYY-MM-DD');
        let style ={
          paddingLeft:"3px",
          opacity:0.5};
    
        for (let assigned of this.state.agenda){
          if(date === assigned) {
            style = {
                background: "lightskyblue",
                border: "1px solid lightcyan",
                fontStyle: "italic",
                fontWeight: "bold",
                paddingLeft: "3px"};
            }
        }
        return <div className="ant-fullcalendar-value" style ={style}>{value.date()}</div>;
      }

    render() {

        console.log('This is props.params',this.props.params)
        if(this.state.redirect){
            return (
                <Redirect to={`/${this.state.date}/activities`}/>
            )
          }

        return (
            <section className="dayActivity">

                <div className="sideBarSchedule">
                    <h3 className="dayHeading">{this.props.params.day}
                    <div className="todayActivityIcon">
                            <Icon style={{ fontSize: '35px' }} type="calendar" onClick={this.handleClick} />
                        </div>
                    </h3>
                    {this.state.active && <Calendar onSelect={this.onSelect} dateFullCellRender={this.onFullRender} fullscreen={false} className="sidebar_calendar" />}

                    <div className="TodayActivityCalendar">
                        <TodayActivityCalendar activities={this.state.activities} params={this.props.match.params}/>
                    </div>
                </div>

                <div className="TodayTask">

                    <div className="TodayActivityBox">
                        <TodayActivityBox activity={this.state.activity} />
                    </div>
                    <div className="Completeness">
                        <span>Status: {this.state.completeness}	</span>
                    </div>
                    <div className="TodayContent">
						<ReactMarkdown source={this.state.activity.content} />
                    </div>
                    <button className="todayActivity_complete" onClick={this.complete}>Complete Activity!</button>
                </div>

            </section>
        )
    }
}

export default TodayActivity;