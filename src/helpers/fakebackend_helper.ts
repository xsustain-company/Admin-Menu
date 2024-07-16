import { APIClient } from "./api_helper";

import * as url from "./url_helper";

const api = new APIClient();

// Gets the logged in user data from local session
export const getLoggedInUser = () => {
  const user = localStorage.getItem("user");
  if (user) return JSON.parse(user);
  return null;
};

// //is user is logged in
export const isUserAuthenticated = () => {
  return getLoggedInUser() !== null;
};

// Register Method
export const postFakeRegister = (data: any) => api.create(url.POST_FAKE_REGISTER, data);

// Login Method
export const postFakeLogin = (data: any) => api.create(url.POST_FAKE_LOGIN, data);

// postForgetPwd
export const postFakeForgetPwd = (data: any) => api.create(url.POST_FAKE_PASSWORD_FORGET, data);

// Edit profile
export const postJwtProfile = (data: any) => api.create(url.POST_EDIT_JWT_PROFILE, data);

export const postFakeProfile = (data: any) => api.update(url.POST_EDIT_PROFILE + '/' + data.idx, data);

// Register Method
export const postJwtRegister = (url: string, data: any) => {
  return api.create(url, data)
    .catch(err => {
      var message;
      if (err.response && err.response.status) {
        switch (err.response.status) {
          case 404:
            message = "Sorry! the page you are looking for could not be found";
            break;
          case 500:
            message = "Sorry! something went wrong, please contact our support team";
            break;
          case 401:
            message = "Invalid credentials";
            break;
          default:
            message = err[1];
            break;
        }
      }
      throw message;
    });
};

// Login Method
export const postJwtLogin = (data: any) => api.create(url.POST_FAKE_JWT_LOGIN, data);

// postForgetPwd
export const postJwtForgetPwd = (data: any) => api.create(url.POST_FAKE_JWT_PASSWORD_FORGET, data);

// postSocialLogin
export const postSocialLogin = (data: any) => api.create(url.SOCIAL_LOGIN, data);

// Calendar
// get Events
export const getEvents = () => api.get(url.GET_EVENTS);

// get Events
export const getCategories = () => api.get(url.GET_CATEGORIES);

// get Upcomming Events
export const getUpCommingEvent = () => api.get(url.GET_UPCOMMINGEVENT);

// add Events
export const addNewEvent = (event: any) => api.create(url.ADD_NEW_EVENT, event);

// update Event
export const updateEvent = (event: any) => api.put(url.UPDATE_EVENT, event);

// delete Event
export const deleteEvent = (event: any) => api.delete(url.DELETE_EVENT, { headers: { event } });

// Chat
// get Contact
export const getDirectContact = () => api.get(url.GET_DIRECT_CONTACT);

// get Messages
export const getMessages = (roomId: any) => api.get(`${url.GET_MESSAGES}/${roomId}`, { params: { roomId } });

// add Message
export const addMessage = (message: any) => api.create(url.ADD_MESSAGE, message);

// add Message
export const deleteMessage = (message: any) => api.delete(url.DELETE_MESSAGE, { headers: { message } });

// get Channels
export const getChannels = () => api.get(url.GET_CHANNELS);

// MailBox
//get Mail
export const getMailDetails = () => api.get(url.GET_MAIL_DETAILS);

// delete Mail
export const deleteMail = (forId: any) => api.delete(url.DELETE_MAIL, { headers: { forId } });

// unread Mail
export const unreadMail = (forId: any) => api.delete(url.UNREAD_MAIL, { headers: { forId } });

// star Mail
export const staredMail = (forId: any) => api.delete(url.STARED_MAIL, { headers: { forId } });

// label Mail
export const labelMail = (forId: any) => api.delete(url.LABEL_MAIL, { headers: { forId } });

// trash Mail
export const trashMail = (forId: any) => api.delete(url.TRASH_MAIL, { headers: { forId } });

// Ecommerce
// get Products
export const getProducts = () => api.get(url.GET_PRODUCTS);

// delete Product
export const deleteProducts = (product : any) => api.delete(url.DELETE_PRODUCT, { headers: { product } } );  // + '/' + product

// add Products
export const addNewProduct = (product : any) => api.create(url.ADD_NEW_PRODUCT, product); //, product
// update Products
export const updateProduct = (product : any) => api.update(url.UPDATE_PRODUCT, product ); // + '/' + product._id, product

// get Orders
export const getOrders = () => api.get(url.GET_ORDERS);

// add Order
export const addNewOrder = (order : any) => api.create(url.ADD_NEW_ORDER, order);

// update Order
export const updateOrder = (order : any) => api.update(url.UPDATE_ORDER, order);

// delete Order
export const deleteOrder = (order : any) => api.delete(url.DELETE_ORDER , { headers: { order } });

// get Customers
export const getCustomers = () => api.get(url.GET_CUSTOMERS);

// add Customers
export const addNewCustomer = (customer : any) => api.create(url.ADD_NEW_CUSTOMER, customer);

// update Customers
export const updateCustomer = (customer : any) => api.update(url.UPDATE_CUSTOMER, customer);

// delete Customers
export const deleteCustomer = (customer : any) => api.delete(url.DELETE_CUSTOMER,  { headers: { customer } });

// get Sellers
export const getSellers = () => api.get(url.GET_SELLERS);

// Project
// get Project list 
export const getProjectList = () => api.get(url.GET_PROJECT_LIST);

// Tasks
// get Task
export const getTaskList = () => api.get(url.GET_TASK_LIST);

// add Task
export const addNewTask = (task : any) => api.create(url.ADD_NEW_TASK, task);

// update Task
export const updateTask = (task : any) => api.update(url.UPDATE_TASK , task);

// delete Task
export const deleteTask = (task : any) => api.delete(url.DELETE_TASK , { headers: { task }});

// Kanban Board
export const getTasks = () => api.get(url.GET_TASKS);
export const addNewTasks = (card: any) => api.create(url.ADD_TASKS, card)
export const updateTasks = (card: any) => api.put(url.UPDATE_TASKS, card)
export const deleteTasks = (card: any) => api.delete(url.DELETE_TASKS, { headers: {card} })

// CRM
// get Contacts
export const getContacts = () => api.get(url.GET_CONTACTS);

// add Contact
export const addNewContact = (contact : any) => api.create(url.ADD_NEW_CONTACT, contact);

// update Contact
export const updateContact = (contact : any) => api.update(url.UPDATE_CONTACT , contact);

// delete Contact
export const deleteContact = (contact : any) => api.delete(url.DELETE_CONTACT , { headers: { contact } });

// get Companies
export const getCompanies = () => api.get(url.GET_COMPANIES);

// add Companies
export const addNewCompanies = (company : any) => api.create(url.ADD_NEW_COMPANIES, company);

// update Companies
export const updateCompanies = (company : any) => api.update(url.UPDATE_COMPANIES , company); //+ '/' + company._id,

// delete Companies
export const deleteCompanies = (company : any) => api.delete(url.DELETE_COMPANIES  , { headers: { company } }); // + '/' + company

// get Deals
export const getDeals = () => api.get(url.GET_DEALS);

// get Leads
export const getLeads = () => api.get(url.GET_LEADS);

// add Lead
export const addNewLead = (lead : any) => api.create(url.ADD_NEW_LEAD, lead);

// update Lead
export const updateLead = (lead : any) => api.update(url.UPDATE_LEAD , lead);

// delete Lead
export const deleteLead = (lead : any) => api.delete(url.DELETE_LEAD , { headers: { lead } } );

// Crypto
// Transation
export const getTransationList = () => api.get(url.GET_TRANSACTION_LIST);

// Order List
export const getOrderList = () => api.get(url.GET_ORDRER_LIST);

// Invoice
//get Invoice
export const getInvoices = () => api.get(url.GET_INVOICES);

// add Invoice
export const addNewInvoice = (invoice: any) => api.create(url.ADD_NEW_INVOICE, invoice);

// update Invoice
export const updateInvoice = (invoice: any) => api.update(url.UPDATE_INVOICE + '/' + invoice._id, invoice);

// delete Invoice
export const deleteInvoice = (invoice: any) => api.delete(url.DELETE_INVOICE + '/' + invoice);

// Support Tickets 
// Tickets
export const getTicketsList = () => api.get(url.GET_TICKETS_LIST);

// add Tickets 
export const addNewTicket = (ticket : any) => api.create(url.ADD_NEW_TICKET, ticket);

// update Tickets 
export const updateTicket = (ticket : any) => api.update(url.UPDATE_TICKET , ticket);

// delete Tickets 
export const deleteTicket = (ticket : any) => api.delete(url.DELETE_TICKET, { headers : { ticket } });

// Dashboard Analytics

// Sessions by Countries
export const getAllData = () => api.get(url.GET_ALL_DATA);
export const getHalfYearlyData = () => api.get(url.GET_HALFYEARLY_DATA);
export const getMonthlyData = () => api.get(url.GET_MONTHLY_DATA);

// Audiences Metrics
export const getAllAudiencesMetricsData = () => api.get(url.GET_ALLAUDIENCESMETRICS_DATA);
export const getMonthlyAudiencesMetricsData = () => api.get(url.GET_MONTHLYAUDIENCESMETRICS_DATA);
export const getHalfYearlyAudiencesMetricsData = () => api.get(url.GET_HALFYEARLYAUDIENCESMETRICS_DATA);
export const getYearlyAudiencesMetricsData = () => api.get(url.GET_YEARLYAUDIENCESMETRICS_DATA);

// Users by Device
export const getTodayDeviceData = () => api.get(url.GET_TODAYDEVICE_DATA);
export const getLastWeekDeviceData = () => api.get(url.GET_LASTWEEKDEVICE_DATA);
export const getLastMonthDeviceData = () => api.get(url.GET_LASTMONTHDEVICE_DATA);
export const getCurrentYearDeviceData = () => api.get(url.GET_CURRENTYEARDEVICE_DATA);

// Audiences Sessions by Country
export const getTodaySessionData = () => api.get(url.GET_TODAYSESSION_DATA);
export const getLastWeekSessionData = () => api.get(url.GET_LASTWEEKSESSION_DATA);
export const getLastMonthSessionData = () => api.get(url.GET_LASTMONTHSESSION_DATA);
export const getCurrentYearSessionData = () => api.get(url.GET_CURRENTYEARSESSION_DATA);

// Dashboard CRM

// Balance Overview
export const getTodayBalanceData = () => api.get(url.GET_TODAYBALANCE_DATA);
export const getLastWeekBalanceData = () => api.get(url.GET_LASTWEEKBALANCE_DATA);
export const getLastMonthBalanceData = () => api.get(url.GET_LASTMONTHBALANCE_DATA);
export const getCurrentYearBalanceData = () => api.get(url.GET_CURRENTYEARBALANCE_DATA);

// Dial Type
export const getTodayDealData = () => api.get(url.GET_TODAYDEAL_DATA);
export const getWeeklyDealData = () => api.get(url.GET_WEEKLYDEAL_DATA);
export const getMonthlyDealData = () => api.get(url.GET_MONTHLYDEAL_DATA);
export const getYearlyDealData = () => api.get(url.GET_YEARLYDEAL_DATA);

// Sales Forecast
export const getOctSalesData = () => api.get(url.GET_OCTSALES_DATA);
export const getNovSalesData = () => api.get(url.GET_NOVSALES_DATA);
export const getDecSalesData = () => api.get(url.GET_DECSALES_DATA);
export const getJanSalesData = () => api.get(url.GET_JANSALES_DATA);

// Dashboard Ecommerce
// Revenue
export const getAllRevenueData = () => api.get(url.GET_ALLREVENUE_DATA);
export const getMonthRevenueData = () => api.get(url.GET_MONTHREVENUE_DATA);
export const getHalfYearRevenueData = () => api.get(url.GET_HALFYEARREVENUE_DATA);
export const getYearRevenueData = () => api.get(url.GET_YEARREVENUE_DATA);


// Dashboard Crypto
// Portfolio
export const getBtcPortfolioData = () => api.get(url.GET_BTCPORTFOLIO_DATA);
export const getUsdPortfolioData = () => api.get(url.GET_USDPORTFOLIO_DATA);
export const getEuroPortfolioData = () => api.get(url.GET_EUROPORTFOLIO_DATA);

// Market Graph
export const getAllMarketData = () => api.get(url.GET_ALLMARKETDATA_DATA);
export const getYearMarketData = () => api.get(url.GET_YEARMARKET_DATA);
export const getMonthMarketData = () => api.get(url.GET_MONTHMARKET_DATA);
export const getWeekMarketData = () => api.get(url.GET_WEEKMARKET_DATA);
export const getHourMarketData = () => api.get(url.GET_HOURMARKET_DATA);

// Dashboard Project
// Project Overview
export const getAllProjectData = () => api.get(url.GET_ALLPROJECT_DATA);
export const getMonthProjectData = () => api.get(url.GET_MONTHPROJECT_DATA);
export const gethalfYearProjectData = () => api.get(url.GET_HALFYEARPROJECT_DATA);
export const getYearProjectData = () => api.get(url.GET_YEARPROJECT_DATA);

// Project Status
export const getAllProjectStatusData = () => api.get(url.GET_ALLPROJECTSTATUS_DATA);
export const getWeekProjectStatusData = () => api.get(url.GET_WEEKPROJECTSTATUS_DATA);
export const getMonthProjectStatusData = () => api.get(url.GET_MONTHPROJECTSTATUS_DATA);
export const getQuarterProjectStatusData = () => api.get(url.GET_QUARTERPROJECTSTATUS_DATA);

// Dashboard NFT
// Marketplace
export const getAllMarketplaceData = () => api.get(url.GET_ALLMARKETPLACE_DATA);
export const getMonthMarketplaceData = () => api.get(url.GET_MONTHMARKETPLACE_DATA);
export const gethalfYearMarketplaceData = () => api.get(url.GET_HALFYEARMARKETPLACE_DATA);
export const getYearMarketplaceData = () => api.get(url.GET_YEARMARKETPLACE_DATA);

// Project
export const addProjectList = (project: any) => api.create(url.ADD_NEW_PROJECT, project);
export const updateProjectList = (project: any) => api.put(url.UPDATE_PROJECT, project);
export const deleteProjectList = (project: any) => api.delete(url.DELETE_PROJECT, { headers: { project } });

// Pages > Team
export const getTeamData = () => api.get(url.GET_TEAMDATA);
export const deleteTeamData = (team: any) => api.delete(url.DELETE_TEAMDATA, { headers: { team } });
export const addTeamData = (team: any) => api.create(url.ADD_NEW_TEAMDATA, team);
export const updateTeamData = (team: any) => api.put(url.UPDATE_TEAMDATA, team);

// File Manager

// Folder
export const getFolders = () => api.get(url.GET_FOLDERS);
export const deleteFolder = (folder: any) => api.delete(url.DELETE_FOLDER, { headers: { folder } });
export const addNewFolder = (folder: any) => api.create(url.ADD_NEW_FOLDER, folder);
export const updateFolder = (folder: any) => api.put(url.UPDATE_FOLDER, folder);

// File
export const getFiles = () => api.get(url.GET_FILES);
export const deleteFile = (file: any) => api.delete(url.DELETE_FILE, { headers: { file } });
export const addNewFile = (file: any) => api.create(url.ADD_NEW_FILE, file);
export const updateFile = (file: any) => api.put(url.UPDATE_FILE, file);

// To Do
export const getTodos = () => api.get(url.GET_TODOS);
export const deleteTodo = (todo: any) => api.delete(url.DELETE_TODO, { headers: { todo } });
export const addNewTodo = (todo: any) => api.create(url.ADD_NEW_TODO, todo);
export const updateTodo = (todo: any) => api.put(url.UPDATE_TODO, todo);

// To do Project
export const getProjects = () => api.get(url.GET_PROJECTS);
export const addNewProject = (project: any) => api.create(url.ADD_NEW_TODO_PROJECT, project);

//Job Application
export const getJobApplicationList = () => api.get(url.GET_APPLICATION_LIST);
export const addNewJobApplicationList = (job: any) => api.create(url.ADD_NEW_APPLICATION_LIST, job);
export const updateJobApplicationList = (job: any) => api.put(url.UPDATE_APPLICATION_LIST, job);
export const deleteJobApplicationList = (job: any) => api.delete(url.DELETE_APPLICATION_LIST, { headers: { job } });

// candidate list
export const getJobCandidateList = () => api.get(url.GET_CANDIDATE, '');
export const addJobCandidate = (candidate : any) => api.create(url.ADD_NEW_CANDIDATE, candidate);
export const updateJobCandidate = (candidate : any) => api.update(url.UPDATE_CANDIDATE, candidate);
export const deleteJobCandidate = (candidate : any) => api.delete(url.DELETE_CANDIDATE, { headers: {candidate} });

// category list
export const getcategoryList = () => api.get(url.GET_CATEGORY_LIST);
export const addcategoryList = (category : any) => api.create(url.ADD_CATEGORY_LIST, category);

//API Key
export const getAPIKey = () => api.get(url.GET_API_KEY);

// grid
export const getCandidateGrid = () => api.get(url.GET_CANDIDATE_GRID);

export const addCandidateGrid = (category : any) => api.create(url.ADD_CANDIDATE_GRID, category);