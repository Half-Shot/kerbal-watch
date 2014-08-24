#include <pebble.h>	
	
Window *window;
TextLayer *clock_layer, *name_layer, *altitude_layer, *apoapsis_layer, *periapsis_layer;
GBitmap *topborder_bitmap;
BitmapLayer *topborder_layer;

enum {
  KEY_NAME = 0, 				// Ship Name
  KEY_ALT = 1,					// Altitude
  KEY_APO = 2,					// Apoapsis
  KEY_PER = 3,					// Periapsis
};

char timebuffer[] = "00:00:00", name_buffer[64], altitude_buffer[32], apoapsis_buffer[32], periapsis_buffer[32];

void tick_handler(struct tm *tick_time, TimeUnits units_changed)
{
	// This runs every second for time and loading data
	strftime(timebuffer, sizeof("00:00:00"), "%H:%M:%S", tick_time);
	text_layer_set_text(clock_layer, timebuffer);
}

void process_tuple(Tuple *t)
{
  //Get key
  int key = t->key;
 
  //Get integer value, if present
  int value = t->value->int32;
 
  //Get string value, if present
  char string_value[32];
  strcpy(string_value, t->value->cstring);
 
  //Decide what to do
  switch(key) {
    case KEY_NAME:
      //Name received
      snprintf(name_buffer, sizeof("abababababababababababababababab"), "%s", string_value);
      text_layer_set_text(name_layer, (char*) &name_buffer);
      break;
    case KEY_ALT:
      //Altitude received
      snprintf(altitude_buffer, sizeof("abababababababab"), "Altitude: %d", value);
      text_layer_set_text(altitude_layer, (char*) &altitude_buffer);
      break;
    case KEY_APO:
      //Apoapsis received
      snprintf(apoapsis_buffer, sizeof("abababababababab"), "Apoapsis: %d", value);
      text_layer_set_text(apoapsis_layer, (char*) &apoapsis_buffer);
      break;
    case KEY_PER:
      //Apoapsis received
      snprintf(periapsis_buffer, sizeof("abababababababab"), "Periapsis: %d", value);
      text_layer_set_text(periapsis_layer, (char*) &periapsis_buffer);
      break;
  }
}

static void in_received_handler(DictionaryIterator *iter, void *context) 
{
	(void) context;
	
	//Get data
	Tuple *t = dict_read_first(iter);
	while(t != NULL)
	{
		process_tuple(t);
		
		//Get next
		t = dict_read_next(iter);
	}
}

void window_load(Window *window)
{
	// Here goes the clock
	clock_layer = text_layer_create(GRect(3, 0, 80, 20));
	text_layer_set_background_color(clock_layer, GColorClear);
	text_layer_set_text_color(clock_layer, GColorBlack);
	text_layer_set_text(clock_layer, "Time");
	
	// Ship name
	name_layer = text_layer_create(GRect(52, 0, 105, 20));
	text_layer_set_background_color(name_layer, GColorClear);
	text_layer_set_text_color(name_layer, GColorBlack);
	text_layer_set_text(name_layer, "No Connection");
	
	// Altitude display
	altitude_layer = text_layer_create(GRect(3, 20, 144, 144));
	text_layer_set_background_color(altitude_layer, GColorClear);
	text_layer_set_text_color(altitude_layer, GColorBlack);
	text_layer_set_font(altitude_layer, fonts_get_system_font(FONT_KEY_GOTHIC_18_BOLD));
	text_layer_set_text(altitude_layer, "Altitude: N/A");
	
	// Apoapsis display
	apoapsis_layer = text_layer_create(GRect(3, 40, 144, 144));
	text_layer_set_background_color(apoapsis_layer, GColorClear);
	text_layer_set_text_color(apoapsis_layer, GColorBlack);
	text_layer_set_font(apoapsis_layer, fonts_get_system_font(FONT_KEY_GOTHIC_18_BOLD));
	text_layer_set_text(apoapsis_layer, "Apoapsis: N/A");
	
	periapsis_layer = text_layer_create(GRect(3, 60, 144, 144));
	text_layer_set_background_color(periapsis_layer, GColorClear);
	text_layer_set_text_color(periapsis_layer, GColorBlack);
	text_layer_set_font(periapsis_layer, fonts_get_system_font(FONT_KEY_GOTHIC_18_BOLD));
	text_layer_set_text(periapsis_layer, "Periapsis: N/A");

	// The top border lines
	topborder_bitmap = gbitmap_create_with_resource(RESOURCE_ID_TOPBORDER);
	topborder_layer = bitmap_layer_create(GRect(0, 0, 144, 20));
	bitmap_layer_set_bitmap(topborder_layer, topborder_bitmap);

	// Render everything nicely
	layer_add_child(window_get_root_layer(window), bitmap_layer_get_layer(topborder_layer));
	layer_add_child(window_get_root_layer(window), text_layer_get_layer(clock_layer));
	layer_add_child(window_get_root_layer(window), text_layer_get_layer(name_layer));
	layer_add_child(window_get_root_layer(window), text_layer_get_layer(altitude_layer));
	layer_add_child(window_get_root_layer(window), text_layer_get_layer(apoapsis_layer));
	layer_add_child(window_get_root_layer(window), text_layer_get_layer(periapsis_layer));
	
	// Clock that fires once per second
	struct tm *t;
	time_t temp;
	temp = time(NULL);
	t = localtime(&temp);
	tick_handler(t, SECOND_UNIT);
}

void window_unload(Window *window)
{
	// Erase everything we got open
	text_layer_destroy(clock_layer);
	text_layer_destroy(name_layer);
	text_layer_destroy(altitude_layer);
	text_layer_destroy(apoapsis_layer);
	text_layer_destroy(periapsis_layer);
	gbitmap_destroy(topborder_bitmap);
	bitmap_layer_destroy(topborder_layer);
}

void init()
{
	// Init the app elements here
	window = window_create();
	window_set_window_handlers(window, (WindowHandlers) {
		.load = window_load,
		.unload = window_unload,
	});

	//Register AppMessage events
	app_message_register_inbox_received(in_received_handler);
	app_message_open(app_message_inbox_size_maximum(), app_message_outbox_size_maximum());    //Largest possible input and output buffer sizes

	window_set_fullscreen(window, true);
	window_stack_push(window, true);
}

void deinit()
{
	// Close everything down
	tick_timer_service_unsubscribe();
	window_destroy(window);
}

int main (void)
{
		// Probably best we don't touch this
		init();
		app_event_loop();
		deinit();
}