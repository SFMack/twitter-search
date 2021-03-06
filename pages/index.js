import React from 'react';
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
		count: '',
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
		const count = this.state.count ? this.state.count / 25 : 10;

		TwitterService.searchTweets({
			accessToken: this.props.twitterAccessToken,
			q,
			count
		}).then(tweets => {
			let allTweets = [];
			tweets.map(tweetArr => allTweets.push(tweetArr));
			console.log(count);
			console.log(allTweets);
			this.setState({
				tweets: allTweets,
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
			<div className='app-container'>
				<div className='tweet-feed-container'>
					{/* Search */}
					<div className='search-content'>
						<div className='search'>
							<input
								type='text'
								className='input-search'
								name='q'
								value={this.state.q}
								onChange={this.onChange}
								placeholder='Search Topic'
							/>
						</div>
						<div className='search'>
							<input
								type='text'
								className='input-search'
								name='count'
								value={this.state.count}
								onChange={this.onChange}
								placeholder='Tweet Count (2500 Max)'
							/>
						</div>
						<div className='search-btn'>
							<button className='btn' onClick={this.onSearch}>
								Search
							</button>
						</div>
					</div>

					{/* Tweet List */}
					<div className='tweet-container'>
						<div className='loading'>{this.state.length} Tweets Loaded</div>
						{this.state.isLoading ? (
							<p className='loading'>Loading...</p>
						) : (
							this.state.tweets.map((item, key) => (
								<div key={key} className='tweet-item'>
									<div>
										<div>
											<img
												className='profile-image'
												src={item.user.profile_image_url_https}
												alt='Profile'
											/>
										</div>
										<div>
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
												<span>{Date(item.created_at)}</span>
											</p>
										</div>
									</div>
									<p className='tweet-text'>{item.text}</p>
									<div>
										<div>
											<a
												href={`https://twitter.com/${item.user.screen_name}/statuses/${item.id_str}`}
												target='_blank'
												rel='noreferrer noopener'
											>
												Go to tweet...
											</a>
										</div>
									</div>
								</div>
							))
						)}
					</div>
				</div>

				{/* Styles */}
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
						.app-container {
							width: 100vw;
							height: 100vh;
						}

						.tweet-feed-container {
							width: 50vw;
							margin: 0 auto;
						}

						.tweets-loaded {
							padding-top: 1rem;
							width: 10rem;
							margin: 0 auto;
						}

						.loading {
							padding-top: 1rem;
							margin: 0 auto;
						}

						.search-content {
							display: flex;
							justify-content: space-between;
							height: 15vh;
							border-radius: 10px;
							box-shadow: 0 5px 20px 0 rgba(204, 204, 204, 0.5);
							padding: 10px 15px;
							margin: 10px 0;
							word-break: break-all;
						}

						.search {
							padding-top: 1.5rem;
							width: 40%;
						}

						.search-btn {
							padding-top: 1rem;
							width: 15%;
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
							padding: 10px;
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
			</div>
		);
	}
}

export default Index;
