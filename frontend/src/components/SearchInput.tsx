import * as React from "react";
import { FormEvent } from "react";
import styled from "styled-components";

interface Props {
	setId: (value: string) => void;
}

const StyledButton = styled.button`
	background: #999;
	border: 0;
	border-radius: 5px;
	margin: 0.5em 1em;
	padding: 5px 12px;
	transition-duration: 0.3s;

	:hover {
		background: #666;
		cursor: pointer;
	}
`;

const StyledItem = styled.li`
	align-items: center;
	border: 1px solid transparent;
	border-radius: 5px;
	cursor: pointer;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	list-style-type: none;
	margin-bottom: 5px;
	max-width: 640px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;

	:hover {
		border: 1px solid #383735;
		transition-duration: 0.8s;
	}

	img {
		max-height: 50px;
		max-width: 90px;
		padding-right: 15px;
	}
`;

const StyledList = styled.ul`
	height: 200px;
	overflow: atuo;
`;

const SearchInput = ({ setId }: Props) => {
	const [term, setTerm] = React.useState<string>("");
	const [list, setList] = React.useState<JSX.Element[]>([]);

	const submitHandler = (event: FormEvent) => {
		const t = encodeURIComponent(term);
		event.preventDefault();
        const fetchUrl = "http://localhost:8089/search/"
		fetch(fetchUrl + t)
			.then((response) => response.json())
			.then((data) => {
				const result = Object.entries(data);
				const items: React.SetStateAction<JSX.Element> | JSX.Element[] =
					[];
				result.forEach((video) => {
					const title: string = video[1] as string;
					items.push(
						<StyledItem
							key={video[0]}
							onClick={() => setId(video[0])}
						>
							<img
								src={`https://img.youtube.com/vi/${video[0]}/3.jpg`}
							/>
							<span>{title}</span>
						</StyledItem>
					);
				});
				setList(items);
			});
	};

	return (
		<React.Fragment>
			<form onSubmit={submitHandler} className="w-full max-w-sm">
				<div className="searchbar">
					<input
						type="text"
						placeholder="Search video..."
						onChange={(event) => setTerm(event.target.value)}
					/>
					<StyledButton type="submit">Search</StyledButton>
				</div>
			</form>
			{list}
		</React.Fragment>
	);
};

export default SearchInput;
