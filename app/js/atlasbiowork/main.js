define(['wq/app', 'wq/map', 'wq/photos', 'wq/locate',
        './locateform', './nested', './outboxphotos', './config',
        'leaflet.draw', 'leaflet.markercluster'],
function(app, map, photos, locate, locateform, nested, outboxphotos, config) {

app.use(map);
app.use(photos);
app.use(locate);
app.use(locateform);
app.use(outboxphotos);
app.use(nested);

config.presync = presync;
config.postsync = postsync;
app.init(config).then(function() {
    ignoreSiteFilter(app.models.observationtype);
    app.jqmInit();
    app.prefetchAll();
});

// Sync UI
function presync() {
    $('button.sync').html("Syncing...");
    $('li a.ui-icon-minus, li a.ui-icon-alert')
       .removeClass('ui-icon-minus')
       .removeClass('ui-icon-alert')
       .addClass('ui-icon-refresh');
}

function postsync(items) {
    $('button.sync').html("Sync Now");
    app.syncRefresh(items);
}

function ignoreSiteFilter(model) {
    // Override observation type filter to ignore site_id argument
    var filterPage = model.filterPage;
    model.filterPage = function(filter) {
        delete filter['site_id'];
        delete filter['parentobs_id'];
        return filterPage(filter);
    }
}

});
