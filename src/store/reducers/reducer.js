import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const DUMMY_CAMPAIGNS = [
	{
		id: 1,
		img: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg',
		campaignName: 'Mid Year Sale',
		status: 'In Progress',
		startDate: '29 May 2021',
		endDate: '30 Jun 2021',
		details: '1st Draft Sent'
	},
	{
		id: 2,
		img: `https://cdn.gobankingrates.com/wp-content/uploads/2018/08/
			Pepsi-and-Coca-Cola-on-green-and-blue-background-shutterstock_673316692.jpg`,
		campaignName: 'Pepsi Cola 123',
		status: 'In Progress',
		startDate: '12 Jun 2021',
		endDate: '13 Jul 2021',
		details: '1st Draft Sent'
	},
	{
		id: 3,
		img: 'https://upload.wikimedia.org/wikipedia/commons/f/f8/Zalora_sg.jpg',
		campaignName: 'Zalora Sale',
		status: 'Completed',
		startDate: '19 Nov 2020',
		endDate: '30 Nov 2020',
		details: 'Payment received'
	},
	{
		id: 4,
		img: 'https://media.philstar.com/photos/2021/05/28/alden-one_2021-05-28_15-46-46.jpg',
		campaignName: 'Lazada Mi-Year Sale',
		status: 'Linking up',
		startDate: '6 Jun 2021',
		endDate: '30 Jun 2021',
		details: 'Interest Indicated'
	},
	{
		id: 5,
		img: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg',
		campaignName: 'Adidas Mid Year Sale',
		status: 'In Progress',
		startDate: '29 May 2021',
		endDate: '30 Jun 2021',
		details: '1st Draft Sent'
	},
	{
		id: 6,
		img: `https://cdn.gobankingrates.com/wp-content/uploads/2018/08/
			Pepsi-and-Coca-Cola-on-green-and-blue-background-shutterstock_673316692.jpg`,
		campaignName: 'Pepsi Cola 123',
		status: 'In Progress',
		startDate: '12 Jun 2021',
		endDate: '13 Jul 2021',
		details: '1st Draft Sent'
	},
	{
		id: 7,
		img: 'https://upload.wikimedia.org/wikipedia/commons/f/f8/Zalora_sg.jpg',
		campaignName: 'Zalora Sale',
		status: 'Completed',
		startDate: '19 Nov 2020',
		endDate: '30 Nov 2020',
		details: 'Payment received'
	},
	{
		id: 8,
		img: 'https://media.philstar.com/photos/2021/05/28/alden-one_2021-05-28_15-46-46.jpg',
		campaignName: 'Lazada Mi-Year Sale',
		status: 'Linking up',
		startDate: '6 Jun 2021',
		endDate: '30 Jun 2021',
		details: 'Interest Indicated'
	}
];

const DUMMY_REVIEWS = [
	{
		campaignName: 'KENTUCKY GO GO',
		company: 'KFC Singapore',
		rating: 4,
		date: '20 Jun 2021',
		desc: 'Ko Yong was really fun to work with! Has a good work ethic and is fun to work with too.'
	},

	{
		campaignName: 'Zalora Mid Year Sale',
		company: 'Zalora',
		rating: 5,
		date: '21 Apr 2021',
		desc: 'Ko Yong was really fun to work with! Has a good work ethic and is fun to work with too.'
	},

	{
		campaignName: 'Just Do It 2020',
		company: 'Adidas',
		rating: 2,
		date: '27 Dec 2020',
		desc: 'Ko Yong was really fun to work with! Has a good work ethic and is fun to work with too.'
	},

	{
		campaignName: 'HUAT AH',
		company: 'Singapore Pools',
		rating: 4,
		date: '29 Jun 2019',
		desc: 'Ko Yong was really fun to work with! Has a good work ethic and is fun to work with too.'
	}
];
const DEFAULT_NEW_CAMPAIGN = {
	progress: 1,
	// Stage 1
	campaignType: '',

	// Stage 2
	campaignName: '',
	campaignDescription: '',
	campaignStartDate: '',
	campaignEndDate: '',
	campaignBudget: '',

	// Stage 3
	audienceGender: '',
	audienceInterests: '',
	audienceLocation: '',
	audienceLanguage: '',

	// Stage 4
	creatorGender: '',
	creatorLocation: '',
	targetNumberOfCreators: '',
	creatorInterests: '',
	followerRequirements: ''
};

const DEFAULT_CREATOR_INFO = {
	avatar: '',
	name: '',
	dob: '',
	gender: '',
	tiktokHandle: '',
	email: '',
	country: '',
	ethnicity: '',
	maritalStatus: '',
	occupation: ''
};

const initialState = {
	creator: {
		// Authentication state ------
		creatorIsAuthenticated: false,
		creatorToken: null,
		creatorTiktokId: null,
		// ---------------------------

		// Creator Details
		creatorInfo: DEFAULT_CREATOR_INFO,

		// Creator campaigns (DUMMY AS OF NOW)
		campaigns: DUMMY_CAMPAIGNS,
		reviews: DUMMY_REVIEWS
	},

	brand: {
		brandCreatorPage: 1,
		// Authentication state ------
		brandIsAuthenticated: false,
		brandToken: null,
		brandName: null,
		brandManagerName: null,
		// ---------------------------

		brandLoading: false,
		brandError: '',

		// Getting creators ----------
		brandCreatorList: null,
		brandCreatorCount: 0,
		brandCreatorFilters: {},
		brandCreatorSort: [10], // Default sort setting is by following count, which is col 10
		// ---------------------------
		brandCampaigns: null,
		brandNewCampaign: DEFAULT_NEW_CAMPAIGN
	},

	isAuthLoading: false,
	authError: ''
};

// Global authentication ----
const authFailureReducer = (state, action) => {
	console.log(action.errorMessage);
	const newBrandObject = updateObject(state.creator, {
		brandToken: null,
		brandName: null,
		brandManagerName: null,
		brandIsAuthenticated: false
	});

	const newCreatorObject = updateObject(state.creator, {
		creatorToken: null,
		creatorTiktokId: null,
		creatorIsAuthenticated: false
	});

	return updateObject(state, {
		creator: newCreatorObject,
		brand: newBrandObject,
		isAuthLoading: false,
		authError: action.errorMessage
	});
};

const authStartReducer = (state) => {
	return updateObject(state, {
		isAuthLoading: true
	});
};

const authResetErrorReducer = (state) => {
	return updateObject(state, {
		authError: ''
	});
};

// Creator authentication --------------------------------------------------------------------
const creatorAuthSuccessReducer = (state, action) => {
	const newCreatorObject = updateObject(state.creator, {
		creatorIsAuthenticated: true,
		creatorToken: action.creatorToken,
		creatorTiktokId: action.creatorTiktokId
	});

	// Storing token and handle in cache.
	const lsCreatorObject = {
		creatorToken: action.creatorToken,
		creatorTiktokId: action.creatorTiktokId
	};

	localStorage.setItem('creator', JSON.stringify(lsCreatorObject));

	return updateObject(state, {
		creator: newCreatorObject,
		isAuthLoading: false,
		authError: ''
	});
};

const creatorAuthLogoutReducer = (state) => {
	const newCreatorObject = updateObject(state.creator, {
		creatorToken: null,
		creatorTiktokId: null,
		creatorIsAuthenticated: false,
		creatorInfo: DEFAULT_CREATOR_INFO
	});

	// Clear user data
	localStorage.clear();

	return updateObject(state, {
		creator: newCreatorObject,
		isAuthLoading: false
	});
};

// Creator Profile Actions

const creatorProfileGetInfo = (state, action) => {
	const newCreatorInfo = updateObject(
		state.creator.creatorInfo,
		action.newInfo
	);

	const newCreatorObject = updateObject(state.creator, {
		creatorInfo: newCreatorInfo
	});

	return updateObject(state, {
		creator: newCreatorObject
	});
};

const creatorProfileUpdateInfo = (state, action) => {
	const newCreatorInfo = updateObject(
		state.creator.creatorInfo,
		action.newInfo
	);

	const newCreatorObject = updateObject(state.creator, {
		creatorInfo: newCreatorInfo
	});

	return updateObject(state, {
		creator: newCreatorObject
	});
};

// ------------------------------------------------------------------------------------------------
// Brand authentication
const brandAuthSuccessReducer = (state, action) => {
	const newBrandObject = updateObject(state.brand, {
		brandIsAuthenticated: true,
		brandToken: action.brandToken,
		brandName: action.brandName,
		brandManagerName: action.brandManagerName
	});

	// Storing token and handle in cache.
	const lsBrandObject = {
		brandToken: action.brandToken,
		brandName: action.brandName,
		brandManagerName: action.brandManagerName
	};

	localStorage.setItem('brand', JSON.stringify(lsBrandObject));

	return updateObject(state, {
		brand: newBrandObject,
		isAuthLoading: false,
		authError: ''
	});
};

const brandAuthLogoutReducer = (state) => {
	const newBrandObject = updateObject(state.brand, {
		brandToken: null,
		brandName: null,
		brandManagerName: null,
		brandIsAuthenticated: false
	});

	// Clear user data
	localStorage.clear();

	return updateObject(state, {
		brand: newBrandObject,
		isAuthLoading: false
	});
};

// Brand get creators

// Reducer to update filters
const brandUpdateCreatorsFiltersReducer = (state, action) => {
	const newBrandObject = updateObject(state.brand, {
		brandCreatorFilters: action.filters,
		brandCreatorSort: action.sort,
		brandCreatorCount: action.brandCreatorCount
	});

	return updateObject(state, {
		brand: newBrandObject
	});
};

// Brands load page reducer.
const brandGetCreatorsReducer = (state, action) => {
	const newBrandObject = updateObject(state.brand, {
		brandLoading: false,
		brandCreatorList: action.brandCreatorList,
		brandCreatorCount: action.brandCreatorCount
	});

	return updateObject(state, {
		brand: newBrandObject
	});
};

// Brand update page number reducer.
const brandUpdatePageReducer = (state, action) => {
	const newBrandObject = updateObject(state.brand, {
		brandCreatorPage: action.brandCreatorPage
	});

	return updateObject(state, {
		brand: newBrandObject
	});
};

const brandLoadStartReducer = (state) => {
	const newBrandObject = updateObject(state.brand, {
		brandLoading: true
	});

	return updateObject(state, {
		brand: newBrandObject
	});
};

const brandLoadFailureReducer = (state, action) => {
	const newBrandObject = updateObject(state.brand, {
		brandLoading: false,
		brandError: action.errorMessage
	});

	return updateObject(state, {
		brand: newBrandObject
	});
};

// Brand new campaign reducers
const brandNewCampaignUpdateReducer = (state, action) => {
	const newCampaign = updateObject(state.brand.brandNewCampaign, {
		[action.newCampaignKey]: action.newCampaignValue
	});

	const newBrandObject = updateObject(state.brand, {
		brandNewCampaign: newCampaign
	});

	return updateObject(state, {
		brand: newBrandObject
	});
};

const brandNewCampaignReducer = (state, action) => {
	const currentBrandCampaigns = state.brand.brandCampaigns;
	currentBrandCampaigns.push(action.campaign);

	const newBrandObject = updateObject(state.brand, {
		brandCampaigns: currentBrandCampaigns,
		brandNewCampaign: DEFAULT_NEW_CAMPAIGN,
		brandLoading: false,
		brandError: ''
	});

	return updateObject(state, {
		brand: newBrandObject
	});
};

const brandGetCampaignsReducer = (state, action) => {
	const newBrandObject = updateObject(state.brand, {
		brandCampaigns: action.brandCampaigns
	});

	return updateObject(state, {
		brand: newBrandObject
	});
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		// Global authentication -------------------------------
		case actionTypes.AUTH_START:
			return authStartReducer(state, action);
		case actionTypes.AUTH_FAILURE:
			return authFailureReducer(state, action);
		case actionTypes.AUTH_CLEAR:
			return authResetErrorReducer(state, action);
		// Creator authentication ------------------------------
		case actionTypes.CREATOR_AUTH_SUCCESS:
			return creatorAuthSuccessReducer(state, action);
		case actionTypes.CREATOR_AUTH_LOGOUT:
			return creatorAuthLogoutReducer(state, action);
		// Creator profile --------------------------------
		case actionTypes.CREATOR_GET_PROFILE_INFO:
			return creatorProfileGetInfo(state, action);
		case actionTypes.CREATOR_UPDATE_PROFILE_INFO:
			return creatorProfileUpdateInfo(state, action);
		// Brand authentication -------------------------------
		case actionTypes.BRAND_AUTH_SUCCESS:
			return brandAuthSuccessReducer(state, action);
		case actionTypes.BRAND_AUTH_LOGOUT:
			return brandAuthLogoutReducer(state, action);

		case actionTypes.BRAND_GET_CREATORS:
			return brandGetCreatorsReducer(state, action);
		case actionTypes.BRAND_UPDATE_FILTERS:
			return brandUpdateCreatorsFiltersReducer(state, action);
		case actionTypes.BRAND_LOAD_START:
			return brandLoadStartReducer(state, action);
		case actionTypes.BRAND_LOAD_FAIL:
			return brandLoadFailureReducer(state, action);
		case actionTypes.BRAND_UPDATE_PAGE:
			return brandUpdatePageReducer(state, action);

		case actionTypes.BRAND_NEW_CAMPAIGN_UPDATE:
			return brandNewCampaignUpdateReducer(state, action);
		case actionTypes.BRAND_NEW_CAMPAIGN:
			return brandNewCampaignReducer(state, action);
		case actionTypes.BRAND_GET_CAMPAIGNS:
			return brandGetCampaignsReducer(state, action);

		default:
			return state;
	}
};

export default reducer;
