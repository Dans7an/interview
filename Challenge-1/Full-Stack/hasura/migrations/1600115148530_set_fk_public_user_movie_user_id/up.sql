alter table "public"."user_movie"
           add constraint "user_movie_user_id_fkey"
           foreign key ("user_id")
           references "public"."user"
           ("id") on update restrict on delete restrict;
