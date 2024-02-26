document.addEventListener('DOMContentLoaded', () => {

	const data = [
		{
			title: "Work",
			timeframe: "daily",
			current: 5,
			previous: 7
		},
		{
			title: "Work",
			timeframe: "weekly",
			current: 32,
			previous: 36
		},
		{
			title: "Work",
			timeframe: "monthly",
			current: 103,
			previous: 128
		},
		{
			title: "Play",
			timeframe: "daily",
			current: 1,
			previous: 2
		},
		{
			title: "Play",
			timeframe: "weekly",
			current: 10,
			previous: 8
		},
		{
			title: "Play",
			timeframe: "monthly",
			current: 23,
			previous: 29
		},
		{
			title: "Study",
			timeframe: "daily",
			current: 0,
			previous: 1
		},
		{
			title: "Study",
			timeframe: "weekly",
			current: 4,
			previous: 7
		},
		{
			title: "Study",
			timeframe: "monthly",
			current: 13,
			previous: 19
		},
		{
			title: "Exercise",
			timeframe: "daily",
			current: 1,
			previous: 1
		},
		{
			title: "Exercise",
			timeframe: "weekly",
			current: 4,
			previous: 5
		},
		{
			title: "Exercise",
			timeframe: "monthly",
			current: 11,
			previous: 18
		},
		{
			title: "Social",
			timeframe: "daily",
			current: 1,
			previous: 3
		},
		{
			title: "Social",
			timeframe: "weekly",
			current: 5,
			previous: 10
		},
		{
			title: "Social",
			timeframe: "monthly",
			current: 21,
			previous: 23
		},
		{
			title: "Self Care",
			timeframe: "daily",
			current: 0,
			previous: 1
		},
		{
			title: "Self Care",
			timeframe: "weekly",
			current: 2,
			previous: 2
		},
		{
			title: "Self Care",
			timeframe: "monthly",
			current: 7,
			previous: 11
		}
	];

	let currentState = 'daily';

	function renderActivityCards(state) {
		const container = document.querySelector('.activity-card__container');
		container.innerHTML = '';

		const groupedData = data.reduce((acc, curr) => {
			if (!acc[curr.title]) {
				acc[curr.title] = [];
			}
			acc[curr.title].push(curr);
			return acc;
		}, {});

		Object.keys(groupedData).forEach(title => {
			const activity = groupedData[title].find(item => item.timeframe === state);
			if (activity) {
				const activityClass = title.toLowerCase().replace(/\s+/g, '-');
				const activityContent = `
					<div class="activity-card">
						<div class="activity-card__top-container ${activityClass}">
							<img src="assets/icon-${activityClass}.svg" />
						</div>
						<div class="activity-card__bottom-container">
							<div class="activity-card__title-container">
									<p class="activity-card__title">${activity.title}</p>
									<img src="assets/icon-ellipsis.svg" alt="ellipsis icon" />
							</div>
							<div class="activity-card__content-container">
									<h2 class="activity-card__hours">${activity.current}hrs</h2>
									<p class="activity-card__previous">Previous - ${activity.previous}hrs</p>
							</div>
						</div>
					</div>
			`;
				container.innerHTML += activityContent;
			}
		});
	}

	function setupEventListeners() {
		const buttons = document.querySelectorAll('.dashboard-profile__button');
		buttons.forEach(button => {
			button.addEventListener('click', (event) => {
				buttons.forEach(btn => btn.classList.remove('dashboard-profile__button--active'));

				event.target.classList.add('dashboard-profile__button--active');

				const state = event.target.classList.contains('dashboard-profile__button--daily') ? 'daily' :
					event.target.classList.contains('dashboard-profile__button--weekly') ? 'weekly' :
						'monthly';
				renderActivityCards(state);
			});
		});
		const defaultButton = document.querySelector('.dashboard-profile__button--daily');
		if (defaultButton) {
			defaultButton.classList.add('dashboard-profile__button--active');
		}
	}

	renderActivityCards(currentState);
	setupEventListeners();
});
