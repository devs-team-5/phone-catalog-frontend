import ReactPaginate from 'react-paginate';
import { ICON_MAP } from '@/components/ui/Icon/icons';
import styles from './Pagination.module.scss';
import type React from 'react';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pageCount = Math.ceil(total / perPage);

  const handlePageClick = (event: { selected: number }) => {
    onPageChange(event.selected + 1);
  };

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel={<ICON_MAP.CHEVRON_RIGHT />}
      onPageChange={handlePageClick}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      pageCount={pageCount}
      previousLabel={<ICON_MAP.CHEVRON_LEFT />}
      forcePage={currentPage - 1}
      renderOnZeroPageCount={null}
      containerClassName={styles.pagination}
      pageClassName={styles.pagination__item}
      pageLinkClassName={styles.pagination__link}
      previousClassName={styles.pagination__item}
      previousLinkClassName={styles.pagination__link}
      nextClassName={styles.pagination__item}
      nextLinkClassName={styles.pagination__link}
      breakClassName={styles.pagination__item}
      breakLinkClassName={styles.pagination__link}
      activeClassName={styles['pagination__item--selected']}
      disabledLinkClassName={styles['pagination__link--disabled']}
    />
  );
};
