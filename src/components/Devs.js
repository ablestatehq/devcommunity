import React from "react";
import { Formik, Form, Field } from "formik";
import Loader from "./shared/Loader";
import ErrorBoundary from "./shared/ErrorBoundary";

const Devs = () => {
	const [devs, setDevs] = React.useState([]);
	const [searchMsg, setSearchMsg] = React.useState("");
	const [searchText, setSearchText] = React.useState("");
	const [loading, setLoading] = React.useState(false);

	React.useEffect(() => {
		loadDevs();
	}, []);

	const loadDevs = async () => {
		setLoading(true);

		const response = await fetch(
			"https://theablestate.github.io/devcommunity/community.json"
		);

		const data = await response.json();

		if (data) {
			setLoading(false);
			setDevs(data.devs);
		} else {
			setLoading(false);
			setDevs([]);
		}
	};

	const handleSearch = async (event) => {
		setLoading(true);
		const { value: TERM } = event.target;
		const LOWER_TERM = TERM.toLowerCase();
		setSearchText(TERM);

		if (LOWER_TERM?.length > 0 && LOWER_TERM !== "") {

			const results = devs.filter(
				(dev) =>
					dev?.stacks?.toLowerCase().includes(LOWER_TERM) ||
					dev?.name?.toLowerCase().includes(LOWER_TERM) ||
					dev?.techskills?.toLowerCase().includes(LOWER_TERM)
			);

            console.log(results);

			if (results.length) {
				setDevs(results)
			} else {
				setSearchMsg("No results match your criteria");
			}

			setLoading(false);

		} else {
			setSearchMsg("");
			loadDevs();
		}
	};

	const handleReset = () => {
		setSearchMsg("");
		setSearchText("");
		loadDevs();
	};

	if (loading) {
		return <Loader title="Please wait..." body="Data is loading" />;
  }

	return (
		<div className="py-5">
			<h3>{devs.length} Elite Developers available. 👋</h3>
			<h1>Choose an Elite Developer from Uganda.</h1>
          <ErrorBoundary>

			<Formik>
				<Form className="mt-2 mb-4">
					<Field
						type="text"
						placeholder="Enter search term..."
						className="p-2 rounded-md"
						id="term"
						value={searchText}
						onChange={handleSearch}
					/>
				</Form>
			</Formik>
          </ErrorBoundary>
			{loading && (
				<div>
					<h1>Searching</h1>
				</div>
			)}
			{searchMsg && (
				<div className="text-center text-red-600 p-2 mb-4">
					{searchMsg} 😨{" "}
					<button
						className="bg-blue-600 text-white rounded-full py-1 px-3"
						onClick={handleReset}>
						Reset
					</button>
				</div>
			)}
			{devs?.length
				? devs.map((dev, index) => (
					<div
						key={index.toString()}
						className="border border-gray rounded-lg bg-white py-4 px-5 mb-2 dark:border-gray-600 dark:text-gray-200 dark:bg-gray-900">
						<h1 className="mb-2">
							{dev.name}{" "}
							{dev.gender === "Female" ? (
								<span title={dev.gender}>👩🏾‍💻</span>
							) : (
								<span title={dev.gender}>👨🏽‍💻</span>
							)}{" "}
							{dev.alumnus === "yes" && (
								<span className="ml-3 text-gray-700 lowercase text-xs rounded-full bg-cyan-100 py-1 px-3">
									Almunus 👍🏽
								</span>
							)}
						</h1>
						<p className="text-sm">
							<span className="text-gray-500 uppercase">
								Stack(s):
							</span>{" "}
							{dev.stacks}
						</p>
						<p className="text-sm mb-3">
							<span className="text-gray-500 uppercase">
								Tech skill(s):
							</span>{" "}
							{dev.techskills}
						</p>
						<a
							href={`${dev.cv}`}
							target="_blank"
							className="text-xs py-1 px-4 bg-cyan-500 rounded-full mr-2 hover:bg-black hover:text-white transition" rel="noreferrer">
							CV
						</a>
						<a
							href={`${dev.portfolio}`}
							target="_blank"
							className="text-xs py-1 px-4 bg-green-500 rounded-full hover:bg-black hover:text-white transition" rel="noreferrer">
							Portfolio
						</a>
					</div>
				))
				: searchMsg === "" && (
					<div className="py-5">
						<h1>No Elite Developers available. 😢</h1>
					</div>
				)}
		</div>
	);
};

export default Devs;
