import React, { PropTypes, Children } from 'react';
import classnames from 'classnames';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import styles from './styles.scss';

const DEFAULT_PLACEHOLDER = 'No data';

const TableRowComponent = ({ columns = [], data = {}, ...rest }) => (
  <tr {...rest}>
    {columns.map(({ key, title, align, colspan, width }) => (
      <td
        data-title={title}
        width={width}
        colSpan={colspan}
        className={align && styles[align]}
        key={key}
      >
        { typeof data[key] !== 'undefined' || React.isValidElement(data[key]) ? data[key] : '' }
      </td>
    ))}
  </tr>
);

const TableHeadComponent = ({ columns = [] }) => (
  <thead>
  <tr>
    {columns.map(({ key, title, width, align }) => (
      <th className={align && styles[align]} width={width} key={key}>{title}</th>
    ))}
  </tr>
  </thead>
);

const TablePlaceholder = withStyles(styles)(({ colSpan, placeholder }) => (
  <tr className={styles.placeholder}>
    <td colSpan={colSpan}>{placeholder}</td>
  </tr>
));

export const TableRow = withStyles(styles)(TableRowComponent);
export const TableHead = withStyles(styles)(TableHeadComponent);

const Table = (props) => {
  const {
    columns = [],
    data = [],
    placeholder = DEFAULT_PLACEHOLDER,
    zebra = true,
    responsive = true,
    hovered = true,
    head = true,
    tbody = true,
    keyColumn,
    rowComponent, headComponent,
    children = [],
  } = props;

  const Head = headComponent || TableHead;
  const Row = rowComponent || TableRow;

  const classNames = classnames(
    styles.table,
    zebra && styles.zebra,
    hovered && styles.hovered,
    responsive && styles.responsive
  );

  let rows = [];

  if (children.length !== 0) {
    rows = Children.map(children, (child, key) => React.cloneElement(child, { columns, key }));
  } else {
    rows = data.map((item, key) => React.createElement(Row, {
      columns,
      key: item[keyColumn] || key,
      data: item,
    }));
  }

  if (rows.length === 0) {
    rows = React.createElement(TablePlaceholder, { colSpan: columns.length, placeholder });
  }

  return (
    <table className={classNames}>
      {head && <Head columns={columns} />}
      {tbody ? <tbody>{rows}</tbody> : rows}
    </table>
  );
};

/* eslint-disable react/no-unused-prop-types */

const columnsType = PropTypes.arrayOf(
  PropTypes.shape({
    key: PropTypes.any.isRequired,
    title: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    align: PropTypes.oneOf(['left', 'center', 'right']),
    colspan: PropTypes.number,
  })
);

Table.propTypes = {
  columns: columnsType,
  data: PropTypes.arrayOf(PropTypes.object),
  placeholder: PropTypes.string,
  zebra: PropTypes.bool,
  hovered: PropTypes.bool,
  head: PropTypes.bool,
  tbody: PropTypes.bool,
  rowComponent: PropTypes.func,
  headComponent: PropTypes.func,
};

TableHeadComponent.propTypes = {
  columns: columnsType.isRequired,
};

TableRowComponent.propTypes = {
  columns: columnsType,
  data: PropTypes.objectOf(PropTypes.any),
};

export default withStyles(styles)(Table);
