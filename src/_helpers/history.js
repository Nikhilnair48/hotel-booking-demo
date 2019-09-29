import { createBrowserHistory } from 'history';

let history = createBrowserHistory();

function resetHistory() {
    history = createBrowserHistory({
        forceRefresh: true
    });
      
}
export { history, resetHistory };