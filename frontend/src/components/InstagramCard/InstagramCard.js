import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import {red} from '@material-ui/core/colors';
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    title: {
        margin: theme.spacing(4, 0, 2),
    },
    list: {
        htmlFontSize: 1
    }
}));

export default function InstagramCard(props) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar className={classes.avatar} src={props.avatar}/>
                }
                title={props.name}
                subheader={props.date}
            />
            <CardMedia
                className={classes.media}
                image={props.image}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {props.text}
                </Typography>
                <Typography variant="h6" className={classes.title}>
                    Tags
                </Typography>
                <div>
                    {props.tags.map(tag => (
                        <Chip variant="outlined" label={tag} key={tag}/>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}