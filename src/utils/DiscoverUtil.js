const sortByCampaign = (a, b) => {
	const keyA = a.campaign;
	const keyB = b.campaign;
	if (keyA < keyB) return -1;
	if (keyA > keyB) return 1;
	return 0;
};

const sortByBrand = (a, b) => {
	const keyA = a.brand;
	const keyB = b.brand;
	if (keyA < keyB) return -1;
	if (keyA > keyB) return 1;
	return 0;
};

const sortByContent = (a, b) => {
	const keyA = a.contentType;
	const keyB = b.contentType;
	if (keyA < keyB) return -1;
	if (keyA > keyB) return 1;
	return 0;
};

const sortByRequirement = (a, b) => {
	const keyA = a.requirements.slice(0, -1);
	const keyB = b.requirements.slice(0, -1);
	if (keyA < keyB) return -1;
	if (keyA > keyB) return 1;
	return 0;
};

const sortByStartDate = (a, b) => {
	const keyA = Date.parse(a.timePeriod.split('-')[0]);
	const keyB = Date.parse(b.timePeriod.split('-')[0]);
	if (keyA < keyB) return -1;
	if (keyA > keyB) return 1;
	return 0;
};

const sortByKey = {
	campaign: sortByCampaign,
	brand: sortByBrand,
	contentType: sortByContent,
	requirements: sortByRequirement,
	timePeriod: sortByStartDate
};

const sortList = (originalList, sortBy) => {
	return originalList.sort(sortByKey[sortBy]);
};

const filterKeyWord = (list, keyword) => {
	const keywordLower = keyword.toLowerCase();
	return list.filter((campaign) => {
		const campaignName = campaign.campaign.toLowerCase();
		const brand = campaign.brand.toLowerCase();

		return campaignName.includes(keywordLower) || brand.includes(keywordLower);
	});
};

const filterContentType = (list, contentType) => {
	return list.filter((campaign) => campaign.contentType === contentType);
};

const filterFollower = (list, follower) => {
	const filterNumber = parseInt(follower.slice(0, -1), 10);

	return list.filter((campaign) => {
		const campaignReq = parseInt(campaign.requirements.slice(0, -1), 10);

		return campaignReq < filterNumber;
	});
};

const FORMAT_DIFF = 28800000;
const filterStartDate = (list, startDate) => {
	return list.filter(
		(campaign) =>
			Date.parse(campaign.timePeriod.split('-')[0]) + FORMAT_DIFF >=
			Date.parse(startDate)
	);
};

export const filterSortList = (originalList, filterState) => {
	// sort first
	let sortedList = originalList;
	if (filterState.sortBy !== '') {
		sortedList = sortList(sortedList, filterState.sortBy);
	}

	// filter list

	// filter by keyword
	if (filterState.keyword !== '') {
		sortedList = filterKeyWord(sortedList, filterState.keyword);
	}

	if (filterState.contentType !== '') {
		sortedList = filterContentType(sortedList, filterState.contentType);
	}

	// filter by follower req.
	if (filterState.followerReq !== '0k') {
		sortedList = filterFollower(sortedList, filterState.followerReq);
	}

	// filter start date
	if (filterState.startDate !== '') {
		sortedList = filterStartDate(sortedList, filterState.startDate);
	}

	return sortedList;
};
