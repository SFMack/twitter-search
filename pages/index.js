import React from 'react';
import App from '../components/App';
import Flex, { Col } from '../components/Flex';
import TwitterService from '../lib/Twitter';

class Index extends React.Component {
	static async getInitialProps() {
		let twitterAccessToken;
		try {
			twitterAccessToken = await TwitterService.obtainAccessToken();
		} catch (error) {
			twitterAccessToken = '';
		}

		return {
			twitterAccessToken
		};
	}

	state = {
		q: '',
		isLoading: false,
		tweets: [],
		count: 100,
		length: 0
	};

	componentDidMount() {
		this.search();
	}

	search() {
		this.setState({
			isLoading: true
		});

		const q = this.state.q || '#coding';
		const count = this.state.count;

		TwitterService.searchTweets({
			accessToken: this.props.twitterAccessToken,
			q,
			count
		}).then(tweets => {
			this.setState({
				tweets,
				isLoading: false,
				length: tweets.length
			});
		});
	}

	onChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	onSearch = e => {
		e.preventDefault();

		this.search();
	};

	render() {
		return (
			<App>
				<Flex>
					<Col xs={8}></Col>
					<Col xs={4}>
						<div className='content'>
							<div className='search-bar'>
								<Flex xs={{ align: 'center', justify: 'space-between' }}>
									<Col xs={8}>
										<input
											type='text'
											className='input-search'
											name='q'
											value={this.state.q}
											onChange={this.onChange}
											placeholder='Search Topic'
										/>
									</Col>
									<Col xs={8}>
										<input
											type='text'
											className='input-search'
											name='count'
											value={this.state.count}
											onChange={this.onChange}
											placeholder='Max Tweet Count'
										/>
									</Col>
									<Col>
										<button className='btn' onClick={this.onSearch}>
											Search
										</button>
									</Col>
								</Flex>
							</div>
							<div className='tweet-container'>
								{this.state.isLoading && <p>Loading...</p>}
								<span>{this.state.length} tweets loaded</span>
								{!this.state.isLoading &&
									this.state.tweets.map((item, key) => (
										<div key={key} className='tweet-item'>
											<Flex xs={{ align: 'center' }}>
												<Col xs={{ right: 10 }}>
													<img
														className='profile-image'
														src={item.user.profile_image_url_https}
														alt='Profile'
													/>
												</Col>
												<Col>
													<p>
														<a
															href={`https://twitter.com/${item.user.screen_name}`}
															target='_blank'
															rel='noreferrer noopener'
														>
															{item.user.name}
														</a>
													</p>
													<p>
														<span>{item.created_at}</span>
													</p>
												</Col>
											</Flex>
											<p className='tweet-text'>{item.text}</p>
											<Flex xs={{ justify: 'flex-end' }}>
												<Col>
													<a
														href={`https://twitter.com/${item.user.screen_name}/statuses/${item.id_str}`}
														target='_blank'
														rel='noreferrer noopener'
													>
														Go to tweet...
													</a>
												</Col>
											</Flex>
										</div>
									))}
							</div>
						</div>
					</Col>
				</Flex>
				<style jsx global>{`
					body {
						font-family: sans-serif;
					}

					a {
						color: #00a4ef;
						text-decoration: none;
					}

					p {
						margin: 0;
					}
				`}</style>
				<style jsx>
					{`
						.content {
							padding: 0 15px;
						}

						.search-bar {
							height: 15vh;
							border-radius: 10px;
							box-shadow: 0 5px 20px 0 rgba(204, 204, 204, 0.5);
							padding: 10px 15px;
							margin: 10px 0;
							word-break: break-all;
						}

						.popular-categories {
							margin-top: 10px;
						}

						.popular-topics {
							margin-bottom: 5px;
							color: #8c8c8c;
							font-size: 14px;
						}

						.category-item {
							color: #00a4ef;
							margin-right: 10px;
							cursor: pointer;
						}

						.tweet-container {
							height: 75vh;
							background: #fff;
							padding: 0 15px;
							overflow-y: scroll;
							border-radius: 10px;
							box-shadow: 0 5px 20px 0 rgba(204, 204, 204, 0.5);
						}

						.tweet-item {
							color: #14171a;
							border-bottom: 1px solid #e6ecf0;
							word-break: break-all;
							margin: 10px 0;
							padding-bottom: 10px;
						}

						.profile-image {
							height: 30px;
							border-radius: 50%;
							border: 1px solid #ccc;
						}

						.tweet-text {
							margin: 5px 0;
						}

						.input-search {
							width: 100%;
							box-sizing: border-box;
							border: 0;
							border-bottom: 1px solid #d3dfef;
							font-size: 14px;
							letter-spacing: 0.3px;
							padding: 14px 20px;
						}

						.btn {
							width: 100%;
							box-sizing: border-box;
							border: 0;
							border-bottom: 1px solid #d3dfef;
							font-size: 14px;
							letter-spacing: 0.3px;
							padding: 14px 20px;
							transition: all 0.2s linear;
							box-shadow: 0 4px 16px 0 rgba(69, 91, 99, 0.08);
						}

						.footer {
							width: 100%;
							background: #b9e7a7;
							color: #717171;
						}
					`}
				</style>
			</App>
		);
	}
}

Index.propTypes = {};

export default Index;
