import "vue-router";

// To ensure it is treated as a module, add at least one `export` statement
export {};

declare module "vue-router" {
  interface RouteMeta {
    /** Hanya dapat diakses jika user login */
    protected: boolean;

    /** Route Title */
    title: string;

    /** Ditampilkan pada menu */
    menu?: boolean;

    /** Icon pada menu */
    icon?: string;

    /** Sembunyikan navigation drawer */
    hideDrawer?: boolean;
  }
}
