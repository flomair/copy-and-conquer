import * as  React from 'react';

import { withStyles, WithStyles } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';



const styles = ({ palette, spacing, typography, shadows }: Theme) => createStyles({
});


interface IProps extends WithStyles<typeof styles> { 
}

class $template$ extends React.Component<IProps> {


  

  render() {
    const { classes } = this.props;

    return (
      <div/>
    );
  }
};


export default withStyles(styles)($template$);
