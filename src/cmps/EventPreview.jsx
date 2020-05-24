import React from 'react';
import UserPreview from './UserPreview';
import Moment from 'moment';
import history from '../history.js'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
});

export default function EventPreview(props) {
    const classes = useStyles();

    // const setImg = () => {
    //     if (props.event.imgUrl.includes('http'))
    //     return 
    //     { props.event.imgUrl } 

    //         { require(`../assets/imgs/${props.event.category.replace(/\s+/g, '')}.jpg` }
    // }

    return (

        <Card className={classes.root}>
            <CardActionArea onClick={()=>{history.push(`/event/${props.event._id}`)}}>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    image={((props.event.imgUrl.includes('http') ? props.event.imgUrl : require(`../assets/imgs/${props.event.category.replace(/\s+/g, '')}.jpg`)))}
                    //   image="/static/images/cards/contemplative-reptile.jpg"
                    title={props.event.title}
                />
                <CardContent>
                    <Typography variant="h6" component="h5" color="textSecondary" >
                        {Moment(props.event.startAt * 1000).toString().split(' ').slice(0, 3).join(' ')}
                    </Typography>
                    <Typography gutterBottom variant="h4" component="h2">
                        {props.event.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" >
                        {props.event.description.split(' ').slice(0, 15).join(' ')}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
            </CardActions>
            <Typography gutterBottom variant="body2" color="textSecondary" component="div">
                <div className="user-price flex space-around">
                    <UserPreview ranking minimalUser={props.event.createdBy} />
                    {(props.event.price) ? <p className="price">${props.event.price}</p> : <p>Free</p>}
                </div>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="div" >
            <Button size="small" variant="contained" color="primary" onClick={() => { history.push(`/event/${props.event._id}`) }}>
                    Count me in
                </Button>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="div">
                {((props.event.members.length !== 0) && (!props.event.capacity)) &&
                    <p>{props.event.members.length} People are already in</p>}
                {((props.event.members.length !== 0) && (props.event.capacity)) &&
                    <p>{props.event.members.length}/{props.event.capacity} People are already in</p>}
                {(props.event.members.length === 0) && <p>Be the first to subscribe</p>}
            </Typography>
            {/* <button onClick={() => props.onDelete(props.event._id)}>Delete</button> */}
        </Card>
    );



    //     <div className="event-item">
    // {props.event.imgUrl && (props.event.imgUrl.includes('http')) ?
    //     <img className="preview-img square-ratio" src={props.event.imgUrl} alt="" /> :
    //     <img
    //         className="preview-img square-ratio"
    //         alt=""
    //         src={require(`../assets/imgs/${props.event.category.replace(/\s+/g, '')}.jpg`)}
    //     />}
    //         <div className="text-container flex column space-between">
    //             <p className="start-at" >
    //                 {Moment(props.event.startAt * 1000).toString().split(' ').slice(0, 3).join(' ')}
    //             </p>
    //             <h3>{props.event.title}</h3>
    //             <p>{props.event.location.address}</p>
    //             <p className="description">
    //                 {props.event.description.split(' ').slice(0, 8).join(' ')}
    //             </p>


    // ----------------------------------------------------------------------



    //             <div className="user-price flex space-around">
    //                 <UserPreview ranking minimalUser={props.event.createdBy} />
    //                 {(props.event.price) ? <p className="price">${props.event.price}</p> : <p>Free</p>}
    //             </div>
    //             <div className="event-item-footer flex">
    //                 {((props.event.members.length !== 0) && (!props.event.capacity)) &&
    //                     <p>{props.event.members.length} People are already in</p>}
    //                 {((props.event.members.length !== 0) && (props.event.capacity)) &&
    //                     <p>{props.event.members.length}/{props.event.capacity} People are already in</p>}

    //                 {(props.event.members.length === 0) && <p>Be the first to subscribe</p>}

    //                 <button><Link to={`/event/${props.event._id}`}>Count me in</Link></button>

    //             </div>
    //         </div>
    //         <Link to={`/event/edit/${props.event._id}`}>Edit</Link>
    //         <button onClick={() => props.onDelete(props.event._id)}>Delete</button>
    //     </div>
    // )
}