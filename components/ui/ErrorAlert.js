import classes from './ErrorAlert.module.css';

export default function ErrorAlert({ children }) {
    return <div className={classes.alert}>{children}</div>;
}
