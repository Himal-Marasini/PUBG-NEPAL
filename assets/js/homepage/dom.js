(() => {
    window.addEventListener('pageshow', function (event) {
        var histroyTraversal = event.persisted || (typeof window.performance != "undefined" && window.performance.navigation.type === 2);
        if (histroyTraversal) {
            window.location.reload();
        }
    });
})();