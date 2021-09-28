import { Avatar, makeStyles } from '@material-ui/core';
import { deepOrange } from '@material-ui/core/colors';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: '100%',
        alignItems: 'center'
    },
    content: {
        border: 'solid 1px #b9b6b6',
        borderRadius: 10,
        background: '#e7e6e6',
        display: 'flex',
        justifyContent: 'center',
        padding: 12,
        maxWidth: '50%',
        overflowWrap: 'anywhere',
        marginBottom: 10,
        fontSize: 14
    },
    avatarWrap: {
        display: 'flex',
        alignItems: 'flex-end',
        padding: 6,
        marginBottom: 5
    },
    avatar: {
        width: 40,
        height: 40,
        padding: 3
    }
}))

const Message = ({message}) => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.avatarWrap}>
                <img src='/bot_avatar.svg' className={classes.avatar}></img>
            </div>
            <div className={classes.content}>
                {message}
            </div>
        </div>
    )
}

export default Message;