import classes from './EventContent.module.css';

export default function EventContent({ content, children }) {
  return (
    <section className={classes.content}>
      {children}
    </section>
  );
}
