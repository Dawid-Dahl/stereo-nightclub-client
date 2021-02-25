import React from "react";
import ReactPaginate, {ReactPaginateProps} from "react-paginate";
import PropTypes from "prop-types";
import styled from "styled-components";

type Props = {
	pageCount: number;
	setPageNumber: React.Dispatch<React.SetStateAction<number>>;
};

const Paginator: React.FC<Props> = ({pageCount, setPageNumber}) => {
	const changePage = ({selected}: any) => setPageNumber(selected);

	return (
		<Wrapper>
			<ReactPaginate
				pageRangeDisplayed={3}
				previousLabel={"<  Previous"}
				nextLabel={"Next  >"}
				pageCount={pageCount}
				onPageChange={changePage}
				marginPagesDisplayed={1}
				containerClassName={"paginator-container"}
				previousLinkClassName={"previous-btn"}
				nextLinkClassName={"next-btn"}
				disabledClassName={"pagination-disabled"}
				activeClassName={"pagination-active"}
			/>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	height: 100%;
	margin: 0.5em 0 1em 0;
`;

export default Paginator;
