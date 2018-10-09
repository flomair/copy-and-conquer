import * as React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';


const styles = ({ palette, spacing, typography, shadows }: Theme) => createStyles({

})



interface IProps extends WithStyles<typeof styles> {
}

const $template$ = (props: IProps) => {

    // if(!props.faults.faultList.length)
    // return null;
    const { classes } = props;


    return (
        <div />
       )
}

export default withStyles(styles)($template$);

